import React from "react";
import UserEditForm from "../../ui/userEditForm";
import BackHistoryButton from "../../common/backButton";
import { useProfession } from "../../../hooks/useProfessions";
import { useQuality } from "../../../hooks/useQualities";
import { useAuth } from "../../../hooks/useAuth";

const UserEditPage = () => {
    const { currentUser } = useAuth();
    const { professions, isLoaading: profIsLoading } = useProfession();
    const { qualities, isLoaading: qualIsLoading } = useQuality();

    return (
        <div className="container mt-5">
            <BackHistoryButton />
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {currentUser && !profIsLoading && !qualIsLoading ? (
                        <UserEditForm
                            {...currentUser}
                            professionsData={professions.map((p) => ({
                                label: p.name,
                                value: p._id
                            }))}
                            qualitiesData={qualities.map((q) => ({
                                label: q.name,
                                value: q._id
                            }))}
                        />
                    ) : (
                        <h3>Loading...</h3>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserEditPage;
