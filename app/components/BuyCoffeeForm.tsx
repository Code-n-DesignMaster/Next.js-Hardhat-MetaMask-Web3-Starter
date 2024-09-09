"use client";

import * as Yup from "yup";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";

const BuyCoffeeForm: React.FC<{
  initialName: string;
  initialMessage: string;
}> = ({ initialName, initialMessage }) => {
  const [currentAccount, setCurrentAccount] = useState<string | null>(null);

  useEffect(() => {
    const checkMetaMaskConnection = async () => {
      if (window.ethereum) {
        try {
          const accounts = (await window.ethereum.request({
            method: "eth_accounts",
          })) as string[];
          console.log("accounts", accounts);

          if (accounts.length > 0) {
            setCurrentAccount(accounts[0]);
          } else {
            toast.error("Please connect to MetaMask.");
          }
        } catch (error) {
          console.error("Error checking MetaMask connection:", error);
        }
      } else {
        toast.error(
          "MetaMask is not installed. Please install MetaMask and try again."
        );
      }
    };

    checkMetaMaskConnection();
  }, []);

  const initialValues = {
    name: initialName,
    message: initialMessage,
    amount: 0, // Provide an initial value for the amount field
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    message: Yup.string().required("Message is required"),
    amount: Yup.number()
      .min(0, "Amount must be greater than or equal to 0")
      .required("Amount is required"),
  });

  const handleBuyCoffee = async (values: {
    name: string;
    message: string;
    amount: number;
  }) => {
    if (!currentAccount) {
      toast.error("MetaMask account not connected.");
      return;
    }

    try {
      const response = await fetch("/api/buyCoffee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          message: values.message,
          amount: values.amount,
          account: currentAccount,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error buying coffee:", error);
      toast.error("Failed to buy coffee.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg font-semibold text-gray-700">
            Buy Me a Coffee
          </div>
        </div>
        <ToastContainer />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleBuyCoffee}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Name
                </label>
                <Field
                  id="name"
                  name="name"
                  placeholder="Your name"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-xs italic"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Message
                </label>
                <Field
                  id="message"
                  name="message"
                  placeholder="Your message"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage
                  name="message"
                  component="div"
                  className="text-red-500 text-xs italic"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="amount"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Amount (in ETH)
                </label>
                <Field
                  type="number"
                  id="amount"
                  name="amount"
                  step="0.01"
                  min="0"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage
                  name="amount"
                  component="div"
                  className="text-red-500 text-xs italic"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Buy Coffee
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default BuyCoffeeForm;
