import { Link } from 'react-router-dom';
import { Children, cloneElement } from 'react';
import { node, bool, string } from 'prop-types';

export default function NavBtn({ children, isActive, link }) {
  const svgClass = isActive
    ? 'stroke-sky-400 fill-sky-400 transition-colors'
    : 'stroke-gray-100 fill-gray-100 transition-colors';

  return (
    <Link
      to={link}
      className={`p-3 border-t-4 flex-1 flex justify-center ${
        isActive && 'border-t-sky-400'
      }`}>
      {Children.map(children, child =>
        child.type === 'svg'
          ? cloneElement(child, {
              className: `${child.props.className || ''} ${svgClass}`.trim(),
            })
          : child,
      )}
    </Link>
  );
}

NavBtn.propTypes = {
  children: node,
  isActive: bool,
  link: string,
};
