import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import axios from "axios";

function EnquiryList({ refreshTrigger }) {
  const [enquiryList, setEnquiryList] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllEnquiry = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8020/api/website/enquiry/view");
      // As per your console: res.data contains { Status: 1, data: [...] }
      if (res.data.Status == 1 || res.data.status == 1) {
        setEnquiryList(res.data.data || []);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllEnquiry();
  }, [refreshTrigger]);

  return (
    <div className="bg-gray-200 p-6 rounded-2xl shadow-sm">
      <h2 className="font-bold text-2xl mb-4 text-gray-800">Enquiry Records</h2>
      <div className="overflow-x-auto rounded-lg border border-gray-300">
        <Table striped>
          <TableHead>
            {/* CORRECT: No <TableRow> here. Flowbite adds it automatically */}
            <TableHeadCell>Sr.</TableHeadCell>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Email</TableHeadCell>
            <TableHeadCell>Phone</TableHeadCell>
            <TableHeadCell>Message</TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10">
                  <Spinner size="md" /> <span className="ml-2">Loading...</span>
                </TableCell>
              </TableRow>
            ) : enquiryList.length > 0 ? (
              enquiryList.map((item, index) => (
                <TableRow key={item._id || index} className="bg-white border-gray-200">
                  <TableCell className="font-medium text-gray-900">{index + 1}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.phone}</TableCell>
                  <TableCell className="max-w-xs truncate italic text-gray-600">
                    {item.message}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10">No records found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default EnquiryList;