import { createColumnHelper, useReactTable, getCoreRowModel} from '@tanstack/react-table';
import * as Constants from '../../../utilities/constants'

export const createHorseTable = (horseData,columnVisibility, setColumnVisibility) => {
    const columnHelper = createColumnHelper();
    const horseColumns = getHorseColumns(columnHelper);
    
    return useReactTable({
                data: horseData,
                columns: horseColumns,
                getCoreRowModel: getCoreRowModel(),
                state: {
                    columnVisibility: columnVisibility,
                },
                onColumnVisibilityChange: setColumnVisibility,
            });
    
};



const getHorseColumns = (columnHelper) => {
        const horseColumns = [
            columnHelper.group({
                header:'Basic Information',
                columns: [
                    columnHelper.accessor('id', {
                        header: () => 'ID'
                    }),                
                    columnHelper.accessor('name', {
                        header: () => 'Name'
                    }),
                    columnHelper.accessor('sex', {
                        header: () => 'Sex'
                    }),
                    columnHelper.accessor('breed', {
                        header: () => 'Breed'
                    }),
                    columnHelper.accessor('type', {
                        header: () => 'Type'
                    }),
                    columnHelper.accessor('height', {
                        header: () => 'H (cm)'
                    }),
                    columnHelper.accessor('born', {
                        header: () => 'Born'
                    })
                ]
            }),
            columnHelper.group({
                header:'Skills',
                columns: [...Constants.disciplineMap.keys()].map((discp) => (
                    columnHelper.group({
                        header:discp,
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
        const colNames = [1,2,3,4,5].map((idx) => (abbrv+`_skill${idx}`));
        const baseCols = colNames.map((cName) => (
                    columnHelper.accessor(cName, {
                        header:'',
                    })
        ));
        const sumCol = columnHelper.display({
            id:abbrv+'_sum',
            header:'∑',
            cell: (info) => colNames.reduce(
                (total,cellName)=>info.row.original[cellName] + total,
                0)
        });
        return baseCols.concat(sumCol);
};
