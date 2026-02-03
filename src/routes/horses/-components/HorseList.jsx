import { useEffect, useState, Fragment, useMemo } from 'react';
import { createColumnHelper, useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';

import * as Constants from '../../../utilities/constants'

const getSkillColumns = (discp,columnHelper) => {
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

const getHorseColumns = () => {
    const columnHelper = createColumnHelper();
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
                    columns: getSkillColumns(discp,columnHelper)
                })
            ))
        }),
    ];
    return horseColumns;
}

const HorseList = () => {
    const [horseData, setHorseData] = useState([]);
    const horseColumns = useMemo(getHorseColumns,[]);

    useEffect(() => {
        window.databaseAPI.getHorses().then(setHorseData);
    },[]);

    const horseTable = useReactTable({
        data: horseData,
        columns: horseColumns,
        getCoreRowModel: getCoreRowModel(),
    });


    return ( 
    <table className="horse-table">
        <thead>
            {
                horseTable.getHeaderGroups().map(headerGroup => (
                    
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                                <th key={header.id} colSpan={header.colSpan}>
                                {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext(),
                                )}
                            </th>
                        ))}
                    </tr>

            ))}
        </thead>
        <tbody>
            {horseTable.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
    </table>
    );
}


export default HorseList;