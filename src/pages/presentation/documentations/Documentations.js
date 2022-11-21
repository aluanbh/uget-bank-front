import React, { useState } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import Button from '../../../components/bootstrap/Button';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import Spinner from '../../../components/bootstrap/Spinner';


function Documentation() {

	const [numPage, setNumPages] = React.useState(null);
	const [pageNumber, setPageNumber] = React.useState(1);

	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages);
		setPageNumber(1);
	}

	function changePage(offset) {
		setPageNumber(prevPageNumber => prevPageNumber + offset);
	}

	function changePageBack() {
		changePage(-1);
	}

	function changePageNext() {
		changePage(1);
	}


	return (
		// <div className="App">
		// 	<header className="App-header">
		// 		<Document file="/doc.pdf" onLoadSuccess={onDocumentLoadSuccess}>
		// 			{Array.from(new Array(numPage), (el, index) => (
		// 				<Page key={`page_${index + 1}`} pageNumber={index + 1} />
		// 			))}
		// 		</Document>

		// 		{/* <div className='col-12'>
		//   <Document file="/doc.pdf" onLoadSuccess={onDocumentLoadSuccess}>
		//     <Page pageNumber={pageNumber} />
		//   </Document>
		//   <p>Page {pageNumber} of {numPage}</p>
		//   {pageNumber > 1 &&
		//     <button onClick={changePageBack} >Previous Page</button>
		//   }
		//   {pageNumber < numPage &&
		//     <button onClick={changePageNext} >Next Page</button>
		//   }
		// </div> */}
		// 	</header>
		// </div>
		// <div className='col-12'>
		// 	<Card>
		// 		<CardHeader borderSize={1}>
		// 			<CardLabel icon='TextSnippet' iconColor='info'>
		// 				<CardTitle>Documentação</CardTitle>
		// 			</CardLabel>
		// 			<CardActions>
		// 				<Button
		// 					color='info'
		// 					icon='FileDownload'
		// 					isLight
		// 					tag='a'
		// 					to='/doc.pdf'
		// 					target='_blank'
		// 					download>
		// 					Download
		// 				</Button>
		// 			</CardActions>
		// 		</CardHeader>
		// 		<CardBody>

		// 			<div className='col-12'>
		// 				<center>
		// 					<div>
		// 						<Document file="/doc.pdf" onLoadSuccess={onDocumentLoadSuccess}>
		// 							{Array.from(new Array(numPage), (el, index) => (
		// 								<Page key={`page_${index + 1}`} pageNumber={index + 1} />
		// 							))}
		// 						</Document>
		// 					</div>
		// 				</center>

		// 			</div>
		// 		</CardBody>
		// 	</Card>
		// </div>

		<div className='col' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
			<h1 style={{ marginRight: '5em' }}>EM BREVE</h1>
			<Spinner size={'10em'} isGrow='true' color="warning">
				Loading...
			</Spinner>
		</div>
	);
}

export default Documentation;
