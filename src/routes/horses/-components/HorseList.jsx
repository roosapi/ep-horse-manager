import { flexRender } from '@tanstack/react-table';


/**
 * 
 * @param {horseTable} a react-table 
 * @returns A table of all the horses in horseData
 */
const HorseList = ({horseTable}) => {

    return ( 
    <table className="horse-table">
        <thead>
            {
                horseTable.getHeaderGroups().map(headerGroup => (
                    
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                                <th key={header.id} className={
                                    (header.colSpan > 1 || header.id.includes('skill1') || header.id.includes('_sum'))? 'group-head':'' + ((header.isPlaceholder) ? ' empty' :'')
                                    } colSpan={header.colSpan}  onClick={header.column.getToggleSortingHandler()}>
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
                <td key={cell.id} 
                    className={
                        cell.column.columnDef.meta?.getCellClass?.(
                            cell.id,
                            cell.getValue()
                        ) ?? ""
                    }>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
    </table>
    );
}



export {HorseList};