import "./asset/css/Loader.css";

export const LoaderDiv = () => {
  return (
    <>
      <div className="loading">
        <div className="corners">
          <div className="corner corner--1"></div>
          <div className="corner corner--2"></div>
          <div className="corner corner--3"></div>
          <div className="corner corner--4"></div>
        </div>
      </div>
    </>
  );
};
