import { flexRender } from '@tanstack/react-table';


/**
 * 
 * @param {horseTable} an instance of HorseTable; a wrapper for react-table with interface to access headers, rows, etc.
 * @returns A table of all the horses in horseData
 */
const HorseList = ({horseTable}) => {


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