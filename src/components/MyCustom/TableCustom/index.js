import React, { memo, useCallback, useState } from 'react';
import useFilterData from '../../../hooks/useFilterData';
import useSortableData from '../../../hooks/useSortableData';
import { exportCSVFile } from '../../../utils/exportFile';
import Button from '../../bootstrap/Button';
import FormGroup from '../../bootstrap/forms/FormGroup';
import Input from '../../bootstrap/forms/Input';
import Icon from '../../icon/Icon';
import PaginationButtons, { dataPagination } from '../../PaginationButtons';

const TableCustom = ({ columns, rows, keyExtractor }) => {
	const [search, setsearch] = useState('');
	const dataFilter = useFilterData(rows, search)
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(10);
	const { items, requestSort, getClassNamesFor } = useSortableData(dataFilter);
	const onCurrentPageData = dataPagination(items, currentPage, perPage);

	const onExport = useCallback(() => {
		const dataExport = dataFilter.map((row) => {
			const data = {};
			columns.forEach((c) => {
				if (c.noExport) return;
				let cell = row[c.field];
				if (c.formatExport)
					cell = c.formatExport(cell);
				cell = cell === undefined ? ' ' : cell;
				data[c.label] = cell;
			});
			return data;
		});
		exportCSVFile(dataExport, 'dados')
	}, [columns, dataFilter])

	return (
		<>
			<div style={{ marginBottom: 20, overflowX: 'auto' }} className='d-flex flex-row-reverse'>
				<Button
					style={{ marginLeft: 20, paddingTop: 0, paddingBottom: 0 }}
					type='button'
					color='primary'
					icon="Download"
					// rounded={1}
					hoverShadow="sm"
					shadow="sm"
					size="sm"
					onClick={onExport}
				>
					Exportar
				</Button>
				<FormGroup id="name" label="" className='col-md-3'>
					<Input
						onChange={e => setsearch(e.target.value)}
						value={search}
						placeholder='Buscar'
					/>
				</FormGroup>
			</div>
			<table className='table table-modern'>
				<thead>
					<tr>
						{columns.map((column) => (
							<th key={'tab-head-' + column.label} onClick={() => requestSort(column.field)}>
								{column.label.toUpperCase()}
								<Icon
									size='sm'
									className={getClassNamesFor(column.field)}
									icon='FilterList'
								/>
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{onCurrentPageData.map((item, index) => (
						<tr key={keyExtractor ? keyExtractor(item) : item.id}>
							{columns.map((c, index2) => (
								<td key={`tab-cell-${item.id}-${index}-${index2}`}>
									{c.format ? c.format(item) : item[c.field]}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>

			<PaginationButtons
				data={items}
				label='items'
				setCurrentPage={setCurrentPage}
				currentPage={currentPage}
				perPage={perPage}
				setPerPage={setPerPage}
			/>
		</>
	);
};

export default memo(TableCustom);
