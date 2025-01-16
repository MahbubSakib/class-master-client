import logo from "../assets/cm.png";

const Footer = () => {
    return (
        <div>
            <footer className="footer bg-base-200 text-base-content p-10">
                <div className='w-10/12 mx-auto flex justify-between'>
                    <aside>
                        <img className="w-20 rounded-full" src={logo} />
                        <p>
                            ACME Industries Ltd.
                            <br />
                            Providing reliable tech since 1992
                        </p>
                    </aside>
                    <nav>
                        <h6 className="footer-title">Services</h6>
                        <div className="flex flex-col space-y-2">
                            <a className="link link-hover">Branding</a>
                            <a className="link link-hover">Design</a>
                            <a className="link link-hover">Marketing</a>
                            <a className="link link-hover">Advertisement</a>
                        </div>
                    </nav>
                    <nav>
                        <h6 className="footer-title">Company</h6>
                        <div className="flex flex-col space-y-2">
                            <a className="link link-hover">About us</a>
                            <a className="link link-hover">Contact</a>
                            <a className="link link-hover">Jobs</a>
                            <a className="link link-hover">Press kit</a>
                        </div>
                    </nav>
                    <nav>
                        <h6 className="footer-title">Legal</h6>
                        <div className="flex flex-col space-y-2">
                            <a className="link link-hover">Terms of use</a>
                            <a className="link link-hover">Privacy policy</a>
                            <a className="link link-hover">Cookie policy</a>
                        </div>
                    </nav>
                </div>
            </footer>
        </div>
    );
};

export default Footer;