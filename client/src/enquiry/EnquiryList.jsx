import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
function EnquiryList(){
  return(
    <div className='bg-gray-200 p-4 rounded-2xl'>
          <h2 className="font-bold text-[20px] mb-4">Enquiry List</h2>
          <div className="overflow-x-auto">
            <Table striped>
              <TableHead>
                <TableHeadCell>Sr no</TableHeadCell>
                <TableHeadCell>Name</TableHeadCell>
                <TableHeadCell>Email</TableHeadCell>
                <TableHeadCell>Phone</TableHeadCell>
                <TableHeadCell>Message</TableHeadCell>
                  <TableHeadCell>
                  <span className="sr-only">Delete</span>
                </TableHeadCell>
                <TableHeadCell>
                  <span className="sr-only">Edit</span>
                </TableHeadCell>
              </TableHead>
              <TableBody className="divide-y">
                <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    1
                  </TableCell>
                  <TableCell>Ali</TableCell>
                  <TableCell>Ai@gmail.com</TableCell>
                  <TableCell>9230023423</TableCell>
                  <TableCell>hello</TableCell>
                  <TableCell>
                    <a
                      href="#"
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Delete
                    </a>
                  </TableCell>
                  <TableCell>
                    <a
                      href="#"
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Edit
                    </a>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
  )
}
export default EnquiryList