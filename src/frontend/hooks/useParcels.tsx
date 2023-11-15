import { useEffect, useState } from "react";
import axios from "axios";


export const useParcels = () => {
    const [parcels, setParcels] = useState<IDbResponseParcel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<null | string>(null);

    const fetchParcels = async () => {
        try {
            const response = await fetch('/api/parcel', {
                cache: "no-cache"
            });
            if (response.ok) {
                const parcels = await response.json()
                setParcels(parcels);
            }
        } catch (err) {
            setError(err.message || "Error fetching parcel categories");  // Capture and set error message.
        } finally {
            setLoading(false); // Data processing is done, set loading to false.
        }
    };

    useEffect(() => {
        fetchParcels();
    }, []);

    return { parcels, loading, error };
}
