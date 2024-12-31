import { Pagination } from '@mui/material';

function PaginationSection({ page, setPage }) {

  const changePageHandler = (event, newPage) => {
    setPage(newPage);
    console.log(newPage);
  }

  return (
    <div className='flex justify-center mt-6'>
      <Pagination
        count={10}
        variant="outlined"
        color="primary"
        page={page}
        onChange={changePageHandler} // Use onChange instead of onClick
        sx={{
          '& .MuiPaginationItem-root': {
            color: 'white', // Change the text color to white
            borderColor: 'white', // Change the border color to white
          },
          '& .MuiPaginationItem-root.Mui-selected': {
            backgroundColor: 'white', // Change the background color of the selected page
            color: 'black', // Change the text color of the selected page
          },
        }}
      />
    </div>
  );
}

export default PaginationSection;