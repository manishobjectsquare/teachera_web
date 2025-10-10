import React from 'react'
import TestimonialSlider from '../Components/Layout/Sliders/TestimonialSlider'
import { useTranslation } from 'react-i18next'

const Testimonial = () => {
    const { t } = useTranslation()
    return (
        <>
            <section className="testimonial tp-space  mt-85">
                <div className="container">
                    <div className="heading text-center">
                        <h3 className="title">{t('Testimonial')}</h3>
                        <p>{t('Hear from Our Successful Learners')}</p>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-8 col-md-12">
                            <TestimonialSlider />
                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}

export default Testimonial