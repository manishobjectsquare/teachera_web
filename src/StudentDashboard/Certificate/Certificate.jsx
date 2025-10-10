import React from 'react';

const Certificate = () => {

    const certificate = {
        title: "Certificate of Completion",
        sub_title: "This is to certify that",
        description: "John Doe has successfully completed the Web Development Fundamentals course with distinction. This course covered HTML, CSS, JavaScript, and responsive design principles.\n\nAwarded on May 15, 2023",
        background: "/certificates/certificate-background.jpg",
        signature: "/certificates/signature.png"
    };


    const certificateItems = [
        { element_id: "title", x_position: 0, y_position: 100 },
        { element_id: "sub_title", x_position: 0, y_position: 150 },
        { element_id: "description", x_position: 0, y_position: 220 },
        { element_id: "signature", x_position: 465, y_position: 400 }
    ];

    const getElementStyle = (elementId) => {
        const item = certificateItems.find(item => item.element_id === elementId);
        if (item) {
            return {
                left: `${item.x_position}px`,
                top: `${item.y_position}px`
            };
        }
        return {};
    };


    const formatDescription = (text) => {
        if (!text) return '';
        return text.split('\n').map((line, index) => (
            <React.Fragment key={index}>
                {line}
                {index < text.split('\n').length - 1 && <br />}
            </React.Fragment>
        ));
    };

    return (
        <div className="certificate-outer">
            <div
                className="certificate-body"
                style={{
                    backgroundImage: `url(${certificate.background})`,
                    width: '930px',
                    height: '600px',
                    background: 'rgb(231, 231, 231)',
                    position: 'relative'
                }}
            >
                {certificate.title && (
                    <div
                        id="title"
                        className="draggable-element"
                        style={{
                            position: 'absolute',
                            fontSize: '22px',
                            fontWeight: 'bold',
                            color: 'black',
                            left: '50%',
                            transform: 'translate(-50%)',
                            width: '730px',
                            textAlign: 'center',
                            ...getElementStyle('title')
                        }}
                    >
                        {certificate.title}
                    </div>
                )}

                {certificate.sub_title && (
                    <div
                        id="sub_title"
                        className="draggable-element"
                        style={{
                            position: 'absolute',
                            fontSize: '18px',
                            color: 'black',
                            left: '50%',
                            transform: 'translate(-50%)',
                            width: '730px',
                            textAlign: 'center',
                            ...getElementStyle('sub_title')
                        }}
                    >
                        {certificate.sub_title}
                    </div>
                )}

                {certificate.description && (
                    <div
                        id="description"
                        className="draggable-element"
                        style={{
                            position: 'absolute',
                            fontSize: '16px',
                            color: 'black',
                            textAlign: 'center',
                            width: '730px',
                            left: '50%',
                            transform: 'translate(-50%)',
                            ...getElementStyle('description')
                        }}
                    >
                        {formatDescription(certificate.description)}
                    </div>
                )}

                {certificate.signature && (
                    <div
                        id="signature"
                        className="draggable-element"
                        style={{
                            position: 'absolute',
                            ...getElementStyle('signature')
                        }}
                    >
                        <img src={certificate.signature || "/placeholder.svg"} alt="Signature" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Certificate;