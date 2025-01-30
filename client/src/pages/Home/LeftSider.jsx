import React from 'react';
import { useSelector } from 'react-redux';

function LeftSider() {
  const { portfolioData } = useSelector((state) => state.root);
  const { contact } = portfolioData;
  const { emailLink, fbLink, instaLink, githubLink, linkedinLink } = contact;

  return (
    <div className="fixed left-3 bottom-0 sm:static">
      <div className="flex flex-col items-center sm:flex-row">
        {/* Social Icons */}
        <div className="flex flex-col gap-5 sm:flex-row sm:justify-center sm:w-full sm:p-4">
          {fbLink && (
            <a
              href={fbLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-gray-400 hover:text-[#3b5998] transition-transform duration-300 hover:scale-110"
            >
              <i className="ri-facebook-circle-fill text-2xl"></i>
            </a>
          )}
          {instaLink && (
            <a
              href={instaLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-gray-400 hover:text-[#E1306C] transition-transform duration-300 hover:scale-110"
            >
              <i className="ri-instagram-line text-2xl"></i>
            </a>
          )}
          {emailLink && (
            <a
              href={`mailto:${emailLink}`}
              aria-label="Email"
              className="text-gray-400 hover:text-[#D44638] transition-transform duration-300 hover:scale-110"
            >
              <i className="ri-mail-line text-2xl"></i>
            </a>
          )}
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-gray-400 hover:text-[#171515] transition-transform duration-300 hover:scale-110"
            >
              <i className="ri-github-fill text-2xl"></i>
            </a>
          )}
          {linkedinLink && (
            <a
              href={linkedinLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-gray-400 hover:text-[#0077b5] transition-transform duration-300 hover:scale-110"
            >
              <i className="ri-linkedin-box-fill text-2xl"></i>
            </a>
          )}
        </div>

        {/* Vertical Line */}
        <div className="w-[1px] h-32 bg-[#125f63] sm:hidden"></div>
      </div>
    </div>
  );
}

export default LeftSider;
