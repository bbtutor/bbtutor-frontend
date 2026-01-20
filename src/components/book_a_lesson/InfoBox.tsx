import Image from "next/image";

function InfoBox() {
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
    <div className="lg:mt-20 space-y-8">
      {/* First Box */}
      <aside className="rounded-[20px] border-[0.5px] p-5 border-primary space-y-3">
        <h2 className="font-semibold leading-7.5 text-xl lg:text-xl text-primary">
          Availability & Response Time
        </h2>
        {/* Availabilty */}
        {AvailabiltyInfo.map((availabilty, index) => {
          return (
            <div key={index} className="flex items-start gap-2 text-black">
              <Image
                src={availabilty.icon}
                alt={"Icon Image"}
                width={20}
                height={20}
              />
              <p className="text-center text-sm leading-5 max-w-xs">
                {availabilty.text}
              </p>
            </div>
          );
        })}
      </aside>

      {/* Second Box */}
      <aside className="rounded-[20px] border-[0.5px] p-5 border-primary space-y-3"></aside>

      {/* Third Box */}
      <aside className="rounded-[20px] border-[0.5px] p-5 border-primary space-y-3">
        <h2 className="font-semibold leading-7.5 text-xl lg:text-xl text-primary">
          Contact Information
        </h2>
        {/* Availabilty */}
        {ContactInfo.map((availabilty, index) => {
          return (
            <div key={index} className="flex items-start gap-2 text-black">
              <Image
                src={availabilty.icon}
                alt={"Icon Image"}
                width={20}
                height={20}
              />
              <p className="text-center text-sm leading-5 max-w-xs">
                {availabilty.text}
              </p>
            </div>
          );
        })}
      </aside>
    </div>
  );
}

export default InfoBox;
