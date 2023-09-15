import { Input } from "@/app/components/ui/input";
import { auth } from "@/app/firebase/client-app";
import { Button } from "@nextui-org/react";
import { sendPasswordResetEmail } from "firebase/auth";
import { ChangeEvent, FormEvent, useState } from "react";

const ResetForm = () => {
  const [emailData, setEmailData] = useState({ email: "" });
  const [success, setSuccess] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEmailData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await sendPasswordResetEmail(auth, emailData.email);
    setSuccess(true);
  };

  return (
    <>
      {!success ? (
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col justify-center items-center gap-2"
        >
          <Input
            type="email"
            onChange={handleChange}
            name="email"
            value={emailData.email}
            className="w-4/5"
          />
          <Button
            type="submit"
            className="bg-primary text-primary-foreground rounded-full w-4/5"
          >
            Reset Password
          </Button>
        </form>
      ) : (
        <p>Check your email :)</p>
      )}
    </>
  );
};

export default ResetForm;
