import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Label,
  TextInput,
  Textarea,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Spinner,
  Alert,
  Modal,
} from "flowbite-react";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineUser,
  HiTrash,
  HiPencil,
  HiOutlineChatAlt2,
} from "react-icons/hi";

export default function Enquiry() {
  const [enquiryList, setEnquiryList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Form & UI States
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [editId, setEditId] = useState(null);
  const [statusMsg, setStatusMsg] = useState({
    show: false,
    text: "",
    color: "",
  });

  // Modal States
  const [openModal, setOpenModal] = useState(false);
  const [selectedMsg, setSelectedMsg] = useState("");

  const getAllEnquiry = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:8020/api/website/enquiry/view"
      );
      if (res.data.Status == 1) setEnquiryList(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllEnquiry();
  }, [refreshTrigger]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = editId
        ? `http://localhost:8020/api/website/enquiry/update/${editId}`
        : "http://localhost:8020/api/website/enquiry/insert";
      const method = editId ? "put" : "post";

      const res = await axios[method](url, formData);
      if (res.data.Status == 1) {
        setStatusMsg({
          show: true,
          text: editId ? "Record Updated" : "Enquiry Sent",
          color: "success",
        });
        setFormData({ name: "", email: "", phone: "", message: "" });
        setEditId(null);
        setRefreshTrigger((p) => p + 1);
      }
    } catch (err) {
      setStatusMsg({ show: true, text: "Action Failed", color: "failure" });
    } finally {
      setLoading(false);
      setTimeout(() => setStatusMsg({ show: false }), 3000);
    }
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setFormData({
      name: item.name,
      email: item.email,
      phone: item.phone,
      message: item.message,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Permenantly delete this record?")) return;
    try {
      await axios.delete(
        `http://localhost:8020/api/website/enquiry/delete/${id}`
      );
      setRefreshTrigger((p) => p + 1);
    } catch (err) {
      console.error(err);
    }
  };

  const showMessage = (msg) => {
    setSelectedMsg(msg);
    setOpenModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">
            CRM Enquiry Hub
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Streamline your client communications and data management.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* FORM CARD - 4 Columns */}
          <div className="lg:col-span-4 lg:sticky lg:top-8 h-fit">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`p-2 rounded-lg ${
                    editId
                      ? "bg-amber-100 text-amber-600"
                      : "bg-indigo-100 text-indigo-600"
                  }`}
                >
                  {editId ? (
                    <HiPencil size={24} />
                  ) : (
                    <HiOutlineChatAlt2 size={24} />
                  )}
                </div>
                <h2 className="text-2xl font-bold text-slate-800">
                  {editId ? "Edit Mode" : "Quick Entry"}
                </h2>
              </div>

              {statusMsg.show && (
                <Alert color={statusMsg.color} className="mb-6 rounded-xl">
                  {statusMsg.text}
                </Alert>
              )}

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <Label
                    htmlFor="name"
                    value="Full Name"
                    className="mb-2 block text-sm font-semibold"
                  />
                  <TextInput
                    icon={HiOutlineUser}
                    name="name"
                    placeholder="Alex Carter"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="email"
                    value="Email Address"
                    className="mb-2 block text-sm font-semibold"
                  />
                  <TextInput
                    icon={HiOutlineMail}
                    name="email"
                    type="email"
                    placeholder="alex@work.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label
                    htmlFor="phone"
                    value="Phone"
                    className="mb-2 block text-sm font-semibold"
                  />
                  <TextInput
                    icon={HiOutlinePhone}
                    name="phone"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label
                    htmlFor="message"
                    value="Detailed Message"
                    className="mb-2 block text-sm font-semibold"
                  />
                  <Textarea
                    name="message"
                    placeholder="Describe the request..."
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    required
                    className="focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    type="submit"
                    className="flex-1 rounded-xl py-1 shadow-md transition-all active:scale-95"
                    color={editId ? "warning" : "indigo"}
                    isProcessing={loading}
                  >
                    {editId ? "Update Record" : "Create Enquiry"}
                  </Button>
                  {editId && (
                    <Button
                      color="light"
                      onClick={() => {
                        setEditId(null);
                        setFormData({
                          name: "",
                          email: "",
                          phone: "",
                          message: "",
                        });
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* DATA TABLE - 8 Columns */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-white/50 backdrop-blur-md">
                <h3 className="text-xl font-bold text-slate-800">
                  Inbound Requests
                </h3>
                <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-sm font-medium">
                  Total: {enquiryList.length}
                </span>
              </div>

              <div className="overflow-x-auto">
                <Table hoverable className="border-none">
                  <TableHead className="bg-slate-50/50">
                    <TableHeadCell className="py-4 px-6 text-slate-500 uppercase tracking-wider">
                      Contact
                    </TableHeadCell>
                    <TableHeadCell className="py-4 px-6 text-slate-500 uppercase tracking-wider">
                      Enquiry Content
                    </TableHeadCell>
                    <TableHeadCell className="py-4 px-6 text-slate-500 uppercase tracking-wider text-right">
                      Actions
                    </TableHeadCell>
                  </TableHead>
                  <TableBody className="divide-y divide-slate-100">
                    {loading && enquiryList.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center py-20">
                          <Spinner size="xl" />
                        </TableCell>
                      </TableRow>
                    ) : (
                      enquiryList.map((item) => (
                        <TableRow
                          key={item._id}
                          className="group transition-all hover:bg-slate-50/80"
                        >
                          <TableCell className="py-5 px-6">
                            <div className="flex flex-col">
                              <span className="text-base font-bold text-slate-900">
                                {item.name}
                              </span>
                              <span className="text-sm text-slate-500">
                                {item.email}
                              </span>
                              <span className="text-xs text-indigo-500 font-medium mt-1">
                                {item.phone}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="py-5 px-6">
                            <div
                              onClick={() => showMessage(item.message)}
                              className="max-w-[280px] cursor-pointer group-hover:text-indigo-600 transition-colors"
                            >
                              <p className="text-sm text-slate-600 line-clamp-2 italic leading-relaxed">
                                "{item.message}"
                              </p>
                              <span className="text-[10px] font-bold uppercase text-slate-400 mt-2 block opacity-0 group-hover:opacity-100 transition-opacity">
                                Click to read full
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="py-5 px-6">
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => handleEdit(item)}
                                className="p-2 text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-all"
                              >
                                <HiPencil size={20} />
                              </button>
                              <button
                                onClick={() => handleDelete(item._id)}
                                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                              >
                                <HiTrash size={20} />
                              </button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MESSAGE DETAIL MODAL */}
      <Modal show={openModal} onClose={() => setOpenModal(false)} size="md">
        <div className="p-6">
          {" "}
          {/* Use a div instead of Modal.Header if it keeps crashing */}
          <h3 className="text-xl font-bold text-indigo-600 border-b pb-3 mb-4">
            Enquiry Detail
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-slate-700 text-lg leading-relaxed whitespace-pre-wrap">
                {selectedMsg}
              </p>
            </div>
            <Button
              color="indigo"
              onClick={() => setOpenModal(false)}
              className="w-full rounded-xl"
            >
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
