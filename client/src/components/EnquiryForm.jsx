import { Button, Label, TextInput, Textarea } from "flowbite-react";
import axios from "axios";
import { useState } from "react";

function EnquiryForm({ triggerRefresh }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // Loading state to prevent multiple clicks
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const res = await axios.post(
        "http://localhost:8020/api/website/enquiry/insert",
        formData
      );
      if (res.data.Status == 1) {
        triggerRefresh();
      }

      console.log("Success:", res.data);

      // Reset form
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to submit enquiry";
      console.error("Error:", errorMsg);
    } finally {
      setLoading(false); // Stop loading regardless of success/fail
    }
  };

  return (
    <div className="bg-gray-200 p-6 rounded-2xl shadow-sm">
      <h2 className="font-bold text-2xl mb-4 text-gray-800">Enquiry Form</h2>

      <form className="flex max-w-md flex-col gap-2" onSubmit={handleSubmit}>
        <div>
          <Label className="mb-2 block" htmlFor="name" value="Your Name" />
          <TextInput
            id="name"
            name="name"
            type="text"
            placeholder="Enter your name"
            required
            onChange={handleChange}
            value={formData.name}
          />
        </div>

        <div>
          <Label className="mb-2 block" htmlFor="email" value="Your Email" />
          <TextInput
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            required
            onChange={handleChange}
            value={formData.email}
          />
        </div>

        <div>
          <Label className="mb-2 block" htmlFor="phone" value="Your Phone" />
          <TextInput
            id="phone"
            name="phone"
            type="text"
            placeholder="+92123456789"
            required
            onChange={handleChange}
            value={formData.phone}
          />
        </div>

        <div>
          <Label className="mb-2 block" htmlFor="message" value="Message" />
          <Textarea
            id="message"
            name="message"
            placeholder="Any message here?..."
            required
            rows={4}
            onChange={handleChange}
            value={formData.message}
          />
        </div>

        <Button
          type="submit"
          className="w-full mt-4"
          isProcessing={loading} // Flowbite prop to show spinner
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </div>
  );
}

export default EnquiryForm;
