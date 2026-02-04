import { useEffect, useState, Fragment, useMemo } from 'react';
import { flexRender } from '@tanstack/react-table';

import * as Constants from '../../../utilities/constants';
import { HorseTable } from '../-utilities/horseTable';


const HorseList = ({columnVisibility,setColumnVisibility}) => {
    const [horseData, setHorseData] = useState([]);
    const horseTable = new HorseTable(horseData,columnVisibility);

    useEffect(() => {
        window.databaseAPI.getHorses().then(setHorseData);
    },[]);

    return ( 
    <table className="horse-table">
        {console.log('horsetable',horseTable.getState())}
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
            {horseTable.getRows().map((row) => (
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