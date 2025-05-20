const SkeletonCard = ({ count = 12 }) => {
  return (
    <div
      data-testid="loading-skeleton"
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
        justifyContent: "space-around",
      }}
    >
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          style={{
            width: "300px",
            height: "300px",
            borderRadius: "8px",
            backgroundColor: "#e0e0e0",
            padding: "12px",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "200px",
              backgroundColor: "#ccc",
              borderRadius: "4px",
            }}
          />
          <div
            style={{
              width: "80%",
              height: "16px",
              backgroundColor: "#d1d1d1",
              borderRadius: "4px",
            }}
          />
          <div
            style={{
              width: "60%",
              height: "14px",
              backgroundColor: "#d1d1d1",
              borderRadius: "4px",
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default SkeletonCard;
