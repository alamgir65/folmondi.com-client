import React from 'react';

const Badge = ({cfg,text}) => {
    return (
        <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap"
            style={{ background: cfg.bg, color: cfg.color }}
            >
            {cfg.dot && (
                <span
                className="w-1.5 h-1.5 rounded-full inline-block"
                style={{ backgroundColor: cfg.dot }}
                />
            )}
            {text ?? cfg.label}
        </span>
    );
};

export default Badge;