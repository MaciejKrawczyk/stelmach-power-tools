'use client'

import React, { useState } from 'react';
import {FieldValues, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import axios from "axios";
import {IOrderCategory, OrderCategorySchema} from "@/lib/types/zod/OrderCategory";
import TextInput from "@/frontend/components/itemsMagazine/form/TextInput";
import InputDivider from "@/frontend/components/itemsMagazine/form/InputDivider";
import ColorPickerInput from "@/frontend/components/itemsMagazine/form/ColorPickerInput";
import TextAreaInput from "@/frontend/components/itemsMagazine/form/TextAreaInput";
import FormEnding from "@/frontend/components/itemsMagazine/form/FormEnding";
import SubmitButton from "@/frontend/components/itemsMagazine/form/SubmitButton";
import ToastNotification from "@/frontend/components/itemsMagazine/form/notification/ToastNotification";
import SuccessModal from "@/frontend/components/itemsMagazine/form/modal/SuccessModal";



const OrderCategoryForm = () => {

    const [showErrorModal, setShowErrorModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({});

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<IOrderCategory>({
        resolver: zodResolver(OrderCategorySchema),
    })

    const onSubmit = async (data: FieldValues) => {
        try {
            setShowErrorModal(false)
            setErrorMessage('')

            const object = await axios.post('/api/order-category', data)

            setShowSuccessModal(true);
            setFormData(object.data);
        } catch (error) {
            if (error instanceof Error) {
                setShowErrorModal(true);
                setErrorMessage(error.message || 'Something went wrong!');
            } else {
                setShowErrorModal(true);
                setErrorMessage('Something went wrong!');
            }
        } finally {
            reset();
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
        >
            <TextInput
                {...register('name')}
                note={errors.name && `${errors.name.message}` || ''}
                description={'Nazwa zamówienia lub numer, który ułatwi Tobie wyszukanie zamówienia'}
                placeholder={'Nazwa zamówienia'}
                title={'Nazwa zamówienia'}
            />
            <InputDivider />
            <ColorPickerInput
                name={'color'}
                defaultValue={"#FF33FF"}
                title='Kolor kategorii'
                control={control}
                note={errors.color && `${errors.color.message}` || ''}
                description='Ustaw kolor, który ułatwi wizualne rozpoznanie szuflad w kategorii'
            />
            <InputDivider />
            <TextAreaInput
                {...register('description')}
                note={errors.description && `${errors.description.message}` || ''}
                title={'Opis zamówienia'}
                description={'Opis zamówienia, ważna informacja dla obsługującego szafy'}
                placeholder={'Opis'}
            />

            <FormEnding />

            <SubmitButton pending={isSubmitting} />

            {showErrorModal && <ToastNotification key={Date.now()} text={errorMessage} />}
            {showSuccessModal && <SuccessModal isOpen={true} text={'Success!'} bigText={'Success!'} objectData={formData} onClose={() => setShowSuccessModal(false)} />}
        
        </form>

    );
}

// Exporting the component
export default OrderCategoryForm;











