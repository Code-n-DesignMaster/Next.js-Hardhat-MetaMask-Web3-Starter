import "./globals.css";

import BuyCoffeeForm from "./components/BuyCoffeeForm";

const Home: React.FC<{ account: string }> = () => {
  const initialName = "John Doe"; // Replace with actual data fetching logic
  const initialMessage = "Hello!"; // Replace with actual data fetching logic

  return (
    <div>
      <BuyCoffeeForm
        initialName={initialName}
        initialMessage={initialMessage}
      />
    </div>
  );
};

export default Home;
