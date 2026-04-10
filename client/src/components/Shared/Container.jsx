const Container = ({ children }) => {
    return (
        <div className="px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto w-full ">
            {children}
        </div>
    );
};

export default Container;