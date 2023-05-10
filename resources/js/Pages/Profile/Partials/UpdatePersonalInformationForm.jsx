import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import '../../../../sass/stylesProfile.scss';
export default function UpdatePersonalInformation({ mustVerifyEmail, status, className = '' }) {
    const user = usePage().props.auth.user;

    const { data, setData, post, processing, errors, reset } = useForm({
        name: user.name,
        code: user.code,
        course: user.course ?? 1,
        institute: user.institute,
        faculty: user.faculty,
        group: user.group,
        phone: user.phone,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('fillInfo'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Обновить личную информацию</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Здесь вы можете обновить вашу персональную информацию
                </p>
            </header>

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="ФИО" />

                    <TextInput
                        id="name"
                        type="text"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="code" value="Шифр" />

                    <TextInput
                        id="code"
                        type="text"
                        name="code"
                        value={data.code}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('code', e.target.value)}
                    />

                    <InputError message={errors.code} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="course" value="Курс" />

                    <TextInput
                        id="course"
                        type="number"
                        name="course"
                        value={data.course}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('course', e.target.value)}
                    />

                    <InputError message={errors.course} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="institute" value="Институт" />

                    <TextInput
                        id="institute"
                        type="text"
                        name="institute"
                        value={data.institute}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('institute', e.target.value)}
                    />

                    <InputError message={errors.institute} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="faculty" value="Факультет" />

                    <TextInput
                        id="faculty"
                        type="text"
                        name="faculty"
                        value={data.faculty}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('faculty', e.target.value)}
                    />

                    <InputError message={errors.faculty} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="group" value="Группа" />

                    <TextInput
                        id="group"
                        type="text"
                        name="group"
                        value={data.group}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('group', e.target.value)}
                    />

                    <InputError message={errors.group} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="phone" value="Телефонный номер" />

                    <TextInput
                        id="phone"
                        type="tel"
                        name="phone"
                        value={data.phone}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('phone', e.target.value)}
                    />

                    <InputError message={errors.phone} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">

                    <PrimaryButton className="ml-4" disabled={processing}>
                        Обновить информацию
                    </PrimaryButton>
                </div>
            </form>
        </section>
    );
}
