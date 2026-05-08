import FooterSocialLink from './FooterSocialLink.jsx';

function FooterSocialGroup({ label, links }) {
    return (
        <div className="footer-social-group">
            <p className="footer-social-label">{label}</p>
            <div className="footer-social-icons">
                {links.map((link, i) => (
                    <FooterSocialLink key={i} href={link.href} label={link.label} icon={link.icon} />
                ))}
            </div>
        </div>
    );
}

export default FooterSocialGroup;
