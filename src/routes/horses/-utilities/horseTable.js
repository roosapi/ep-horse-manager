import { useMemo } from 'react';
import { createColumnHelper, useReactTable, getCoreRowModel } from '@tanstack/react-table';
import * as Constants from '../../../utilities/constants'


export class HorseTable {
    #horseTable;
    #columnHelper;
    #horseColumns;

    constructor(useData,columnVisibility) {
        this.#columnHelper = createColumnHelper();
        console.log('colhelp',this.#columnHelper)
        this.#horseColumns = useMemo(()=>this.#getHorseColumns(),[]);
        this.#horseTable =useReactTable({
                data: useData,
                columns: this.#horseColumns,
                getCoreRowModel: getCoreRowModel(),
                state: {
                    columnVisibility:columnVisibility,
                },
                //onColumnVisibilityChange: setColumnVisibility, # this is not needed as long as the col visibility is not changed through cell/row methods?
            });
        
    }

    getHeaderGroups() {
        return this.#horseTable.getHeaderGroups();
    }

    getRows() {
        return this.#horseTable.getRowModel().rows;
    }

    getState() {
        return this.#horseTable.getState();
    }

    #getHorseColumns() {
        const horseColumns = [
            this.#columnHelper.group({
                header:'Basic Information',
                columns: [
                    this.#columnHelper.accessor('id', {
                        header: () => 'ID'
                    }),                
                    this.#columnHelper.accessor('name', {
                        header: () => 'Name'
                    }),
                    this.#columnHelper.accessor('sex', {
                        header: () => 'Sex'
                    }),
                    this.#columnHelper.accessor('breed', {
                        header: () => 'Breed'
                    }),
                    this.#columnHelper.accessor('type', {
                        header: () => 'Type'
                    }),
                    this.#columnHelper.accessor('height', {
                        header: () => 'H (cm)'
                    }),
                    this.#columnHelper.accessor('born', {
                        header: () => 'Born'
                    })
                ]
            }),
            this.#columnHelper.group({
                header:'Skills',
                columns: [...Constants.disciplineMap.keys()].map((discp) => (
                    this.#columnHelper.group({
                        header:discp,
                        id:discp.toLowerCase(),
                        columns: this.#getSkillColumns(discp,this.#columnHelper)
                    })
                ))
            }),
        ];
        return horseColumns;
    }

    #getSkillColumns(discp) {
        const abbrv = Constants.disciplineMap.get(discp);
        const colNames = [1,2,3,4,5].map((idx) => (abbrv+`_skill${idx}`));
        const baseCols = colNames.map((cName) => (
                    this.#columnHelper.accessor(cName, {
                        header:'',
                    })
        ));
        const sumCol = this.#columnHelper.display({
            id:abbrv+'_sum',
            header:'∑',
            cell: (info) => colNames.reduce(
                (total,cellName)=>info.row.original[cellName] + total,
                0)
        });
        return baseCols.concat(sumCol);
    };
}