import React from 'react';

const Marque = () => {
    return (
        <div className="marquee-container">
            <div className="marquee-track">
                {[
                    { icon: "🚚", text: "৳৫০০ এর উপরে ফ্রি ডেলিভারি" },
                    { icon: "🌿", text: "১০০% প্রাকৃতিক" },
                    { icon: "📦", text: "ঢাকায় একই দিনে ডেলিভারি" },
                    { icon: "🔄", text: "সহজ রিটার্ন" },
                ]
                    .concat([
                        { icon: "🚚", text: "৳৫০০ এর উপরে ফ্রি ডেলিভারি" },
                        { icon: "🌿", text: "১০০% প্রাকৃতিক" },
                        { icon: "📦", text: "ঢাকায় একই দিনে ডেলিভারি" },
                        { icon: "🔄", text: "সহজ রিটার্ন" },
                    ]) // duplicate for smooth loop
                    .map((item, i) => (
                        <div className="marquee-item" key={i}>
                            <span>{item.icon}</span>
                            <span>{item.text}</span>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Marque;