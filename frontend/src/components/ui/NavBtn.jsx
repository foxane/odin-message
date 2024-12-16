import { Link } from 'react-router-dom';
import { Children, cloneElement } from 'react';
import { node, bool, string } from 'prop-types';

export default function NavBtn({ children, isActive, link }) {
  const svgClass = isActive
    ? 'stroke-sky-400 fill-sky-400'
    : 'stroke-gray-100 fill-gray-100';

  return (
    <Link to={link} className={'p-3'}>
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
