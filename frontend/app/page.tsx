```typescript
import { useState } from 'react';
import { Phone, MapPin, Clock } from 'lucide-react-native';
import { useForm } from 'react-hook-form';

export default function Home() {
  const { register, handleSubmit } = useForm();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (data: any) => {
    console.log(data);
    setSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <section className="hero bg-orange-500 text-white p-12 text-center">
        <h1 className="text-5xl font-bold">Home Slice Pizza</h1>
        <p className="text-xl">Your favorite pizza restaurant</p>
      </section>
      <section className="services mt-12">
        <h2 className="text-3xl font-bold">Our Services</h2>
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <div className="card bg-white p-4 shadow-md w-80">
            <h3 className="text-xl font-bold">Delivery</h3>
            <p className="text-gray-600">Get your pizza delivered right to your door</p>
          </div>
          <div className="card bg-white p-4 shadow-md w-80">
            <h3 className="text-xl font-bold">Takeout</h3>
            <p className="text-gray-600">Pick up your pizza and enjoy on the go</p>
          </div>
          <div className="card bg-white p-4 shadow-md w-80">
            <h3 className="text-xl font-bold">Dine-in</h3>
            <p className="text-gray-600">Enjoy your pizza in our cozy restaurant</p>
          </div>
        </div>
      </section>
      <section className="contact mt-12">
        <h2 className="text-3xl font-bold">Get in Touch</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-4">
          <input
            type="text"
            {...register('name')}
            placeholder="Name"
            className="p-2 border border-gray-400 rounded-md"
          />
          <input
            type="email"
            {...register('email')}
            placeholder="Email"
            className="p-2 border border-gray-400 rounded-md"
          />
          <textarea
            {...register('message')}
            placeholder="Message"
            className="p-2 border border-gray-400 rounded-md"
          />
          <button type="submit" className="bg-orange-500 text-white p-2 rounded-md">
            Send Message
          </button>
          {submitted && <p className="text-green-500">Message sent successfully!</p>}
        </form>
      </section>
      <footer className="footer mt-12 p-4 bg-gray-200 text-gray-600">
        <div className="flex flex-wrap justify-center gap-4">
          <div className="flex items-center gap-2">
            <Phone size={20} />
            <p>123-456-7890</p>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={20} />
            <p>123 Main St, Anytown, USA</p>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={20} />
            <p>Mon-Thu: 11am-10pm, Fri-Sat: 11am-11pm, Sun: 12pm-9pm</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
```