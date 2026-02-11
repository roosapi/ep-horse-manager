import { 
    createColumnHelper, 
    useReactTable, 
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
} from '@tanstack/react-table';
import * as Constants from '../../../utilities/constants'

const UniqueColValuesFeature = {
                    createColumn: (column, table) => {
                        column.getUniqueValues = () => {
                            const values = table.getCoreRowModel().rows.map((row) => row.getValue(column.id));
                            return Array.from(new Set(values)).filter(Boolean);
                        };
                    },
                    };

export const createHorseTable = (
    horseData,
    columnVisibility, setColumnVisibility,
    sorting,setSorting,
    columnFilters,setColumnFilters) => {
    const columnHelper = createColumnHelper();
    const horseColumns = getHorseColumns(columnHelper);
    return useReactTable({
                data: horseData,
                columns: horseColumns,
                getCoreRowModel: getCoreRowModel(),
                getSortedRowModel: getSortedRowModel(),
                getFilteredRowModel: getFilteredRowModel(),
                state: {
                    sorting: sorting,
                    columnVisibility: columnVisibility,
                    columnFilters: columnFilters,
                },
                onColumnVisibilityChange: setColumnVisibility,
                onSortingChange:setSorting,
                onColumnFiltersChange: setColumnFilters,
                _features: [UniqueColValuesFeature],
            });
    
};



const getHorseColumns = (columnHelper) => {

        const horseColumns = [
            columnHelper.group({
                header:'Basic Information',
                columns: ['ID','Name','Sex','Breed','Type','Height','Born'].map((infoName) => {
                    const id = infoName.toLowerCase();
                    return columnHelper.accessor(id, {
                                    id:id,
                                    filterFn: 'includesString',
                                    header: () => {
                                            return (
                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <span>{'\u200b'}</span>
                                                <span>{'\u200b'}</span>
                                                <span>{infoName === 'Height' ? 'H (cm)' : infoName}</span>
                                                </div>
                                            )
                                        },
                                })  
                    })
            }),
            columnHelper.group({
                // This is a placeholder column for max and avg header rows
                header:'',
                id:'header-row-titles',
                columns: [columnHelper.display({
                            header: () => {
                                return (
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span>max</span>
                                    <span>avg</span>
                                    <span>{'\u200b'}</span>
                                    </div>
                                )
                            },
                            id:'header-row-titles-sub',
                            cell: ()=>'',
                        })]
                

            }),
            columnHelper.group({
                header:'Personality',
                columns: Constants.persoStats.map((stat) => (
                    columnHelper.accessor(stat, {
                        id:stat,
                        header: ({table}) => {
                                const rows = table.getFilteredRowModel().rows
                                const values = rows.map(r => r.getValue(stat))

                                const avg = values.reduce((a, b) => a + b, 0) / values.length
                                return (
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <span>{'\u200b'}</span>
                                        <span>{Math.round(avg).toString()}</span>
                                        <span>{stat.slice(0,1)}</span>
                                    </div>
                                    )
                        },
                    })
                ))
            }),
            columnHelper.group({
                header:'Conformation',
                columns: [...Constants.confoStats.slice(0,4).map((stat) => (
                    columnHelper.accessor(stat, {
                        id: stat,
                        header: ({table}) => {
                                const rows = table.getFilteredRowModel().rows
                                const values = rows.map(r => r.getValue(stat))

                                const avg = values.reduce((a, b) => a + b, 0) / values.length
                                return (
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <span>{'\u200b'}</span>
                                        <span>{Math.round(avg).toString()}</span>
                                        <span>{(stat === 'baseneck') ? 'bn' : stat.slice(0,2)}</span>
                                    </div>
                                    )
                        },
                        
                    })
                )),
                columnHelper.group({
                    header:'Front Legs',
                    columns: Constants.confoStats.slice(4,7).map((stat) => (
                    columnHelper.accessor(stat, {
                        id:stat,
                        header: ({table}) => {
                                const rows = table.getFilteredRowModel().rows
                                const values = rows.map(r => r.getValue(stat))

                                const avg = values.reduce((a, b) => a + b, 0) / values.length
                                return (
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <span>{'\u200b'}</span>
                                        <span>{Math.round(avg).toString()}</span>
                                        <span>{stat.split('_')[1].slice(0,1)}</span>
                                    </div>
                                    )
                        },
                    })
                ))
                }),
                columnHelper.group({
                    header:'Rear Legs',
                    columns: Constants.confoStats.slice(7).map((stat) => (
                    columnHelper.accessor(stat, {
                        id:stat,
                        header: ({table}) => {
                                const rows = table.getFilteredRowModel().rows
                                const values = rows.map(r => r.getValue(stat))

                                const avg = values.reduce((a, b) => a + b, 0) / values.length
                                return (
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <span>{'\u200b'}</span>
                                        <span>{Math.round(avg).toString()}</span>
                                        <span>{stat.split('_')[1].slice(0,1)}</span>
                                    </div>
                                    )
                        },
                    })
                ))
                }),
                ]
            }),

            columnHelper.group({
                header:'Skills',
                columns: [...Constants.disciplineMap.keys()].map((discp) => (
                    columnHelper.group({
                        header: Constants.combiDisciplinesMap.has(discp) ? Constants.disciplineMap.get(discp) : discp,
                        id:discp,
                        columns: getSkillColumns(discp,columnHelper)
                    })
                ))
            }),
        ];
        return horseColumns;
};

const getSkillColumns = (discp, columnHelper) => {
        const abbrv = Constants.disciplineMap.get(discp);

        // Combi disciplines are just a sum of the base disciplines
        if (Constants.combiDisciplinesMap.has(discp)) {
            const baseDiscps = Constants.combiDisciplinesMap.get(discp);
            const colNames = baseDiscps.map((base_abbrv) => [1,2,3,4,5].map((idx) => (base_abbrv+`_skill${idx}`))).flat();
            const sumCol = columnHelper.accessor( row =>
                            colNames.reduce((total,cellName)=>row[cellName] + total, 0),
                            {                
                                id:abbrv+'_sum',
                                header: ({ table }) => {
                                    const rows = table.getFilteredRowModel().rows
                                    const values = rows.map(r => r.getValue(abbrv+'_sum'))

                                    const max = Math.max(...values)
                                    const avg = values.reduce((a, b) => a + b, 0) / values.length

                                    return (
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <span>{max}</span>
                                        <span>{Math.round(avg).toString()}</span>
                                        <span>{'∑'}</span>
                                        </div>
                                    )
                                },
                            });
            return [sumCol];
        } else {
            const colNames = [1,2,3,4,5].map((idx) => (abbrv+`_skill${idx}`));
            const baseCols = colNames.map((cName) => (
                        columnHelper.accessor(cName, {
                            id:cName,
                            header: ({ table }) => {
                                const rows = table.getFilteredRowModel().rows
                                const values = rows.map(r => r.getValue(cName))

                                const max = Math.max(...values)
                                const avg = values.reduce((a, b) => a + b, 0) / values.length

                                return (
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span>{max}</span>
                                    <span>{Math.round(avg).toString()}</span>
                                    <span>{'\u200b'}</span>
                                    </div>
                                )
                            },
                        })
            ));
            const sumCol = columnHelper.accessor(row => colNames.reduce((total,cellName)=>row[cellName] + total, 0), {
                            id:abbrv+'_sum',
                            header: ({ table }) => {
                                const rows = table.getFilteredRowModel().rows
                                const values = rows.map(r => r.getValue(abbrv+'_sum'))

                                const max = Math.max(...values)
                                const avg = values.reduce((a, b) => a + b, 0) / values.length

                                return (
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span>{max}</span>
                                    <span>{Math.round(avg).toString()}</span>
                                    <span>∑</span>
                                    </div>
                                )
                                },
                            
                        });
            return baseCols.concat(sumCol);
        }
};

