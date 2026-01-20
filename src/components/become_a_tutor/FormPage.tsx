import React from "react";
import Title from "../ui/title";
import Paragraph from "../ui/paragraph";
import TutorForm from "./TutorForm";

function FormPage() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-20 gradient-bg">
      <Title text="Submit Your Application" center />
      <Paragraph
        text="Fill out the form below and we'll get back to you within 48 hours"
        center
      />

      <TutorForm />
    </section>
  );
}

export default FormPage;
