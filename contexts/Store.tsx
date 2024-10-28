'use client'

import { setUpdateApplications, updateApplications } from "@/store/reducers/application";
import { mountProvider } from "@/store/store";



const reducers = [updateApplications, setUpdateApplications]
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const actions = reducers.map((r) => r.action)
type Actions = typeof actions[number]

export const { useStoreActions, useStoreSelects, Provider } = mountProvider<Actions>(reducers)

const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <Provider>
            {children}
        </Provider>
    )
}

export default StoreProvider
