import React, { useState } from 'react';

import {FieldValues, useForm} from "react-hook-form";

import axios from "axios";
import {zodResolver} from "@hookform/resolvers/zod";
import TextInput from "@/src/frontend/components/itemsMagazine/form/TextInput";
import {IShelfCategory, ShelfCategorySchema} from "@/src/lib/types/zod/Shelf";
import InputDivider from "@/src/frontend/components/itemsMagazine/form/InputDivider";
import ColorPickerInput from "@/src/frontend/components/itemsMagazine/form/ColorPickerInput";
import TextAreaInput from "@/src/frontend/components/itemsMagazine/form/TextAreaInput";
import FormEnding from "@/src/frontend/components/itemsMagazine/form/FormEnding";
import SubmitButton from "@/src/frontend/components/itemsMagazine/form/SubmitButton";
import ToastNotification from "@/src/frontend/components/itemsMagazine/form/notification/ToastNotification";
import SuccessModal from "@/src/frontend/components/itemsMagazine/form/modal/SuccessModal";




const ShelfCategoryForm = () => {

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
    } = useForm<IShelfCategory>({
        resolver: zodResolver(ShelfCategorySchema)
    })

    const onSubmit = async (data: FieldValues) => {
        try {
            setShowErrorModal(false)
            setErrorMessage('')

            const object = await axios.post('/api/shelf-category', data)

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
                description='Nazwa kategorii, która ma ułatwić segregowanie przedmiotów w szafie'
                placeholder='nazwa kategorii'
                note={errors.name && `${errors.name.message}` || ''}
                title='Nazwa kategorii'
            />

            <InputDivider />

            <ColorPickerInput
                defaultValue={"#FF33FF"}
                name={'color'}
                control={control}
                title='Kolor kategorii'
                note={errors.color && `${errors.color.message}` || ''}
                description='Ustaw kolor, który ułatwi wizualne rozpoznanie szuflad w kategorii'
            />

            <InputDivider />

            <TextAreaInput
                {...register('notes')}
                note={errors.notes && `${errors.notes.message}` || ''}
                description='Opis kategorii, ważna informacja dla obsługującego szafy'
                title='Opis kategorii'
                placeholder='Notatki'
            />

            <FormEnding />

            <SubmitButton pending={isSubmitting} />

            {showErrorModal && <ToastNotification key={Date.now()} text={errorMessage} />}
            {showSuccessModal && <SuccessModal isOpen={true} text={'Success!'} bigText={'Success!'} objectData={formData} onClose={() => setShowSuccessModal(false)} />}
        
        </form>
    );
}

export default ShelfCategoryForm;
