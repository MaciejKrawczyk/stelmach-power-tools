import React, { useState } from 'react';
import TextInput from "@/src/components/form/TextInput";
import InputDivider from "@/src/components/form/InputDivider";
import TextAreaInput from "@/src/components/form/TextAreaInput";
import SubmitButton from "@/src/components/form/SubmitButton";
import {ICompany, CompanySchema} from "@/src/types/zod/Company";
import ToastNotification from "@/src/components/form/notification/ToastNotification";
import SuccessModal from "@/src/components/form/modal/SuccessModal";
import {FieldValues, useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import FormEnding from "@/src/components/form/FormEnding";

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