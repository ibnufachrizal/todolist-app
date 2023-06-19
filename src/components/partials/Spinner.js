const Spinner = ({ action }) => {
  return (
    <div className="lds-ring">
      <div className={action !== undefined ? "h-8 w-8" : "h-4 w-4"}></div>
      <div className={action !== undefined ? "h-8 w-8" : "h-4 w-4"}></div>
      <div className={action !== undefined ? "h-8 w-8" : "h-4 w-4"}></div>
      <div className={action !== undefined ? "h-8 w-8" : "h-4 w-4"}></div>
    </div>
  );
};

export default Spinner;
