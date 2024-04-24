import React, { useState } from "react";
import plus from "/svgs/plusWhite.svg";

const questions = [
  {
    question:
      "What if the skill made available is different from what I desired?",
    answer:
      "Your ability to have your skill of choice is tied with time i.e your ability to register early enough.",
  },
  {
    question: "Do I have the opportunity of changing my skill after selection?",
    answer:
      "You cannot by any means change your choice after selecting a skill. Therefore take enough time to decide on your most preferred before making a choice.",
  },
  {
    question: "What should I do if my trainer demands for money or any gift?",
    answer:
      "Students are advised to make a formal report of such a trainer to the Management of CENT through their supervisor and Coordinator with evidence, e.g video recording, phone or voice recording or a witness e.t.c .",
  },
  {
    question:
      "What do I need to do if I may not be able to attend a training class?",
    answer:
      "Write an official letter of permission through your HOD and Dean, Students Affairs to the Director of the Centre with valid reason(s).",
  },
  {
    question:
      "What do I need to do if my maximum course unit load is exceeded having registered ENT 302 for second semester?",
    answer:
      "Visit your departmental course registration officer or level advisor for counsel.",
  },
  {
    question:
      "What should be my reaction if a trainer makes undue sexual advances towards me?",
    answer:
      "Make an official report to the Management of CENT with concrete evidence e.g video recording, phone recording or an eye- witness e.t.c",
  },
  {
    question: "",
    answer: "",
  },
  {
    question:
      "How are skills and Trainers being allocated to Trainees (students?)",
    answer:
      "Skills and Trainers are being randomly allocated to students by the Computer based on the information made available.",
  },
  {
    question: "Can a 400level student register?",
    answer: "NO only 300l or 500l students can register.",
  },
  {
    question: "What if my skill of interest is unavailable?",
    answer:
      "All skills cannot be available. You have to register as early as you can and select the preferred skill from the available ones at the time of the registration, please note the skills are just case-studying in furtherance of ENT 301 which you did in the previous semester.",
  },
  {
    question:
      "What can I do, while on training my health condition does not cope with my chosen skill?",
    answer: "Please visit the Centre and make your case known.",
  },
  {
    question:
      "Is the registration with departmental registration officer automatic registration for ENT302",
    answer:
      "NO, You must follow the centre’s instructions for registration for your skill of interest, to register for ENT302.",
  },
  {
    question: "How and when can we check our posting?",
    answer:
      "You can check online as soon as you are done with your registration.",
  },
  {
    question: "How do we locate our training venue?",
    answer:
      "Information on the location address or the phone contact of the Trainer will be made available upon selection of a particular skill.",
  },
  {
    question: "How long will the portal be opened for registration?",
    answer: "The portal will be opened for about 2 weeks for registration.",
  },
  {
    question: "Which days of the week will the training hold?",
    answer:
      "The training will hold on Friday between the hours of 2:00pm to 5:00pm and Saturday between 9:00am to 5:00pm.",
  },
  {
    question: "Will there be exhibition after the training?",
    answer: "The exhibition will come up at the end of the training at the time specified by the Management of the Centre.",
  },
];

interface FAQProps {
  length?: number | null;
}

const FAQ: React.FC<FAQProps> = ({ length }) => {
  const [curr, setCurr] = useState<number | null>(null);

  return (
    <div className="w-full">
      {questions.slice(0, length || questions.length).map((question, index) => (
        <div
          key={index.toString()}
          className="text-sm bg-[#313131] bg-opacity-30 mt-6"
        >
          <div className="flex justify-between bg-[#313131] text-white p-4">
            <p>{question.question}</p>
            <img
              src={plus}
              className={`w-5 cursor-pointer transition-transform transform ${
                curr === index ? "rotate-45" : ""
              }`}
              onClick={() => setCurr(index)}
            />
          </div>
          {curr === index ? <p className="p-4">{question.answer}</p> : ""}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
