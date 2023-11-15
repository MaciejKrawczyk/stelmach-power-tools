import React, { useState } from 'react';
import {FieldValues, useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import InputDivider from "@/frontend/components/itemsMagazine/form/InputDivider";
import {CompanySchema, ICompany} from "@/lib/types/zod/Company";
import TextInput from "@/frontend/components/itemsMagazine/form/TextInput";
import TextAreaInput from "@/frontend/components/itemsMagazine/form/TextAreaInput";
import FormEnding from "@/frontend/components/itemsMagazine/form/FormEnding";
import SubmitButton from "@/frontend/components/itemsMagazine/form/SubmitButton";
import ToastNotification from "@/frontend/components/itemsMagazine/form/notification/ToastNotification";
import SuccessModal from "@/frontend/components/itemsMagazine/form/modal/SuccessModal";


const CompanyForm = () => {

    const [showErrorModal, setShowErrorModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({});

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ICompany>({
        resolver: zodResolver(CompanySchema)
    })

    const onSubmit = async (data: FieldValues) => {
        try {
            setShowErrorModal(false)
            setErrorMessage('')

            const object = await axios.post('/api/company', data)

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
                    {...register('name', )}
                    note={errors.name && `${errors.name.message}` || ''}
                    placeholder={'Nazwa firmy'}
                    title={'Nazwa firmy'}
                    description={'Nazwa firmy np. producent, firma, która ostrzy, firma świadcząca jakąś usługę'}
                />
                <InputDivider />
                <TextAreaInput
                    {...register('notes', )}
                    description={'Ważne informacje o firmie np. telefon kontaktowy, adres, email, opis'}
                    title={'Opis przedmiotu'}
                    note={errors.notes && `${errors.notes.message}` || ''}
                    placeholder={'Notatki'}
                />

                <FormEnding />

                <SubmitButton pending={isSubmitting} />

                {showErrorModal && <ToastNotification key={Date.now()} text={errorMessage} />}
                {showSuccessModal && <SuccessModal isOpen={true} text={'Success!'} bigText={'Success!'} objectData={formData} onClose={() => setShowSuccessModal(false)} />}
            
            </form>
    );
}

export default CompanyForm;