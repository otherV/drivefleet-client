import Link from "next/link";
import { FaCar, FaShieldAlt, FaHeadset, FaMoneyBillWave } from "react-icons/fa";
import CarCard from "@/components/CarCard";

async function getCars() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars`);
  const data = await res.json();
  return data;
}

export default async function Home() {
  const cars = await getCars();

  return (
    <div>


      {/* Banner */}
      <section className="min-h-[90vh] bg-base-100 flex items-center px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-6xl font-black uppercase mb-6">
            Drive Your <span className="text-primary">Dream</span> Car Today
          </h1>
          <p className="text-lg text-base-content/70 mb-8 max-w-xl mx-auto">
            Premium car rentals at your fingertips. Choose from a wide selection of vehicles and hit the road in style.
          </p>
          <Link href="/cars" className="btn btn-primary btn-lg">
            Explore Cars
          </Link>
        </div>
      </section>


      {/* How It Works */}
      <section className="py-24 bg-base-200">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-black uppercase text-center mb-16">
            How It <span className="text-primary">Works</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Browse", desc: "Explore our wide selection of premium vehicles and find the perfect match." },
              { step: "02", title: "Book", desc: "Reserve your car in minutes with our simple and secure booking system." },
              { step: "03", title: "Drive", desc: "Pick up your car and hit the road. It's that simple." },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="text-6xl font-black text-primary/20 mb-4">{item.step}</div>
                <h3 className="text-xl font-bold uppercase mb-3">{item.title}</h3>
                <p className="text-base-content/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Available Cars */}
      <section className="py-24 bg-base-100">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-black uppercase text-center mb-16">
            Available <span className="text-primary">Cars</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.slice(0, 6).map((car) => (
              <CarCard key={car._id} car={car} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/cars" className="btn btn-primary btn-lg">
              View All Cars
            </Link>
          </div>
        </div>
      </section>


      {/* Why Choose Us */}
      <section className="py-24 bg-base-200">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-black uppercase text-center mb-16">
            Why Choose <span className="text-primary">Us</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <FaCar size={32} />, title: "Wide Selection", desc: "From economy to luxury, we have the right car for every occasion." },
              { icon: <FaMoneyBillWave size={32} />, title: "Best Prices", desc: "Competitive rates with no hidden fees. What you see is what you pay." },
              { icon: <FaShieldAlt size={32} />, title: "Fully Insured", desc: "All our vehicles are fully insured for your peace of mind." },
              { icon: <FaHeadset size={32} />, title: "24/7 Support", desc: "Our support team is always available to help you on the road." },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="text-primary flex justify-center mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold uppercase mb-3">{item.title}</h3>
                <p className="text-base-content/70 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


    </div>
  );
}