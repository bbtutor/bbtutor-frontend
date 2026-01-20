import Image from "next/image";

export default function InfoBox() {
  const AvailabiltyInfo = [
    {
      icon: "/img/blueEmailIcon.png",
      text: "Email Response: Within 24 hours",
    },

    {
      icon: "/img/whatsapp.png",
      text: "WhatsApp Response: Usually within 1-2 hours",
    },

    {
      icon: "/img/emailIcon.png",
      text: "Available Days: Monday - Sunday",
    },
  ];

  const BookingInfo = [
    "Fill out the form or message on WhatsApp",
    "Receive confirmation and discuss details",
    "Join your scheduled session and begin!",
  ];

  const ContactInfo = [
    {
      icon: "/img/addressIcon.png",
      text: "Address: Murtala Mohammad Highway, Calabar, CRS",
    },
    {
      icon: "/img/blueEmailIcon.png",
      text: "bbtutors001@gmail.com",
    },
    {
      icon: "/img/call.png",
      text: "+234 806 498 2027",
    },
    {
      icon: "/img/whatsapp.png",
      text: "Available on WhatsApp",
    },
  ];

  return (
    <div className="lg:mt-20 space-y-6 sm:space-y-8">
      {/* First Box */}
      <aside className="rounded-2xl sm:rounded-[20px] border-[0.5px] p-5 sm:p-6 lg:p-5 border-primary space-y-3 sm:space-y-4">
        <h2 className="font-semibold leading-7 sm:leading-7.5 text-lg sm:text-xl lg:text-xl text-primary">
          Availability & Response Time
        </h2>
        {AvailabiltyInfo.map((availability, index) => (
          <div
            key={index}
            className="flex items-start gap-2.5 sm:gap-3 text-black"
          >
            <span className="text-lg sm:text-xl shrink-0 mt-0.5">
              <Image
                src={availability.icon}
                alt="Icon"
                width={20}
                height={20}
              />
            </span>
            <p className="text-sm sm:text-base leading-5 sm:leading-6">
              {availability.text}
            </p>
          </div>
        ))}
      </aside>

      {/* Second Box */}
      <aside className="rounded-2xl sm:rounded-[20px] border-[0.5px] p-5 sm:p-6 lg:p-5 border-primary space-y-3 sm:space-y-4">
        <h2 className="font-semibold leading-7 sm:leading-7.5 text-lg sm:text-xl lg:text-xl text-primary">
          Booking Process
        </h2>
        <ol className="list-decimal text-black list-inside space-y-2">
          {BookingInfo.map((booking, index) => (
            <li
              key={index}
              className="text-sm sm:text-base leading-5 sm:leading-6 pl-1"
            >
              {booking}
            </li>
          ))}
        </ol>
      </aside>

      {/* Third Box */}
      <aside className="rounded-2xl sm:rounded-[20px] border-[0.5px] p-5 sm:p-6 lg:p-5 border-primary space-y-3 sm:space-y-4">
        <h2 className="font-semibold leading-7 sm:leading-7.5 text-lg sm:text-xl lg:text-xl text-primary">
          Contact Information
        </h2>
        {ContactInfo.map((contact, index) => (
          <div
            key={index}
            className="flex items-start gap-2.5 sm:gap-3 text-black"
          >
            <span className="text-lg sm:text-xl shrink-0 mt-0.5">
              <Image src={contact.icon} alt="Icon" width={20} height={20} />
            </span>
            <p className="text-sm sm:text-base leading-5 sm:leading-6 wrap-break-word">
              {contact.text}
            </p>
          </div>
        ))}
      </aside>
    </div>
  );
}
