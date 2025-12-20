import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout>
          <Head title="Profile" />

            <div className="py-12 mx-20 ">
                <div className="max-w-7xl  mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="row rounded-2xl bg-gradient-to-br from-black via-gray-900 to-zinc-900 text-white p-4 d-flex justify-content-between">

                      <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                          <UpdateProfileInformationForm
                              mustVerifyEmail={mustVerifyEmail}
                              status={status}
                              className="max-w-xl"
                          />
                      </div>

                      <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                          <UpdatePasswordForm className="max-w-xl" />
                      </div>
                    </div>

                    <div className="row rounded-2xl bg-gradient-to-br from-black via-gray-900 to-zinc-900 text-white p-4">
                      <div className="col-12">
                          <DeleteUserForm className="max-w-xl" />
                      </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}





