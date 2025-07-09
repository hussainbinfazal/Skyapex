"use client";

import React, { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, FileText, Shield, Zap } from "lucide-react";
import { z } from "zod";
import axios from "axios";
import { deedSchema } from "@/lib/zodValidation";
import { toast } from "sonner";
type FormData = {
  fullName: string;
  fatherName: string;
  propertySize: string;
  saleAmount: number;
  date?: string;
  [key: string | number]: string | undefined | number;
};
type Errors = {
  [key: string]: string | null;
};

export const DeedForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    fatherName: "",
    propertySize: "",
    saleAmount: 0,
    date: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const validateForm = (): boolean => {
    const result = deedSchema.safeParse(formData);

    if (!result.success) {
      const newErrors: Errors = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          newErrors[err.path[0]] = err.message;
        }
      });
      setErrors(newErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const generateDeed = async (): Promise<void> => {
    const deed: FormData = {
      fullName: formData.fullName,
      fatherName: formData.fatherName,
      propertySize: formData.propertySize,
      saleAmount: formData.saleAmount,
    };
    const response = await axios.post("/api/createdeed", deed, {
      responseType: "blob", // critical for PDFs
    });
    const url = URL.createObjectURL(response.data);
    const a = document.createElement("a");
    a.href = url;
    a.download = "SaleDeed.pdf";
    a.click();
    toast.success("Deed generated successfully!");
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;
    setIsSubmitting(true);

    await generateDeed();
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);

      // Reset form after success
      setTimeout(() => {
        setSubmitSuccess(false);
        setFormData({
          fullName: "",
          fatherName: "",
          propertySize: "",
          saleAmount: 0,
          date: "",
        });
      }, 3000);
    }, 2000);
  };

  const formatCurrency = (value: number) => {
    if (!value) return "";
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
      </div>

      {/* Form Section */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 pt-20">
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl font-bold text-gray-900">
              Property Sale Deed Generator
            </CardTitle>
            <CardDescription className="text-lg text-gray-600">
              Fill in the details below to generate your property deed
            </CardDescription>
          </CardHeader>

          <CardContent>
            {submitSuccess && (
              <Alert className="mb-6 border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  Deed generated successfully! Check your downloads for the
                  document.
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="fullName"
                    className="text-sm font-medium text-gray-700"
                  >
                    Full Name *
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className={`transition-all duration-200 ${
                      errors.fullName
                        ? "border-red-500 focus:border-red-500"
                        : "focus:border-blue-500"
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="fatherName"
                    className="text-sm font-medium text-gray-700"
                  >
                    Father's Name *
                  </Label>
                  <Input
                    id="fatherName"
                    name="fatherName"
                    type="text"
                    value={formData.fatherName}
                    onChange={handleInputChange}
                    placeholder="Enter father's name"
                    className={`transition-all duration-200 ${
                      errors.fatherName
                        ? "border-red-500 focus:border-red-500"
                        : "focus:border-blue-500"
                    }`}
                  />
                  {errors.fatherName && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.fatherName}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="propertySize"
                    className="text-sm font-medium text-gray-700"
                  >
                    Property Size (sq.ft.) *
                  </Label>
                  <Input
                    id="propertySize"
                    name="propertySize"
                    type="number"
                    value={formData.propertySize}
                    onChange={handleInputChange}
                    placeholder="Enter property size"
                    className={`transition-all duration-200 ${
                      errors.propertySize
                        ? "border-red-500 focus:border-red-500"
                        : "focus:border-blue-500"
                    }`}
                  />
                  {errors.propertySize && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.propertySize}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="saleAmount"
                    className="text-sm font-medium text-gray-700"
                  >
                    Sale Amount (₹) *
                  </Label>
                  <Input
                    id="saleAmount"
                    name="saleAmount"
                    type="number"
                    value={formData.saleAmount}
                    onChange={handleInputChange}
                    placeholder="Enter sale amount"
                    className={`transition-all duration-200 ${
                      errors.saleAmount
                        ? "border-red-500 focus:border-red-500"
                        : "focus:border-blue-500"
                    }`}
                  />
                  {formData.saleAmount && (
                    <p className="text-sm text-gray-600 mt-1">
                      {formatCurrency(formData.saleAmount)}
                    </p>
                  )}
                  {errors.saleAmount && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.saleAmount}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="date"
                  className="text-sm font-medium text-gray-700"
                >
                  Date of Sale *
                </Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  max={new Date().toISOString().split("T")[0]}
                  className={`transition-all duration-200 ${
                    errors.date
                      ? "border-red-500 focus:border-red-500"
                      : "focus:border-blue-500"
                  }`}
                />
                {errors.date && (
                  <p className="text-sm text-red-600 mt-1">{errors.date}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Generating Deed...
                  </div>
                ) : (
                  "Generate Property Deed"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
