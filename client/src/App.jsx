import { Button, Label, TextInput, Textarea } from "flowbite-react";

import EnquiryList from "./enquiry/EnquiryList";

function App() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Enquiry form submitted");
  };
  return (
    <div>
      <h1 className="text-[40px] text-center py-6 font-bold">User Enquiry</h1>
      <div className="grid grid-cols-[30%_auto] gap-10">
        <div className="bg-gray-200 p-4 rounded-2xl">
          <h2 className="font-bold text-[20px]">Enquiry Form</h2>
          <form
            className="flex max-w-md flex-col gap-4 "
            onSubmit={handleSubmit}
          >
            <div className="py-3">
              <div className="mb-2 block">
                <Label className="text-black" htmlFor="name">
                  Your Name
                </Label>
              </div>
              <TextInput
                id="name"
                type="text"
                placeholder="Enter your name"
                required
                shadow
                name="name"
              />
            </div>
            <div className="py-3">
              <div className="mb-2 block">
                <Label htmlFor="email">Your Email</Label>
              </div>
              <TextInput id="email" type="email" name="email" required shadow />
            </div>
            <div className="py-3">
              <div className="mb-2 block">
                <Label className="text-black" htmlFor="phone">
                  Your Phone
                </Label>
              </div>
              <TextInput
                id="phone"
                type="text"
                placeholder="+92123456789"
                required
                shadow
                name="phone"
              />
            </div>
            <div className="py-3">
              <div className="mb-2 block">
                <Label className="text-black" htmlFor="message">
                  Message
                </Label>
              </div>
              <Textarea
                id="message"
                name="message"
                placeholder="Any message here?..."
                required
                rows={4}
              />
            </div>
            <div className="py-3">
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
          </form>
        </div>

        <EnquiryList/>
      </div>
    </div>
  );
}


export default App;
