'use client'

import React, {FC, useState} from "react";
import axios from "axios";
import {useItem} from "@/src/frontend/hooks/itemsMagazine/useItem";
import {PlaceNameById} from "@/src/lib/utils/PlaceNameById";
import LinkModal from "@/src/frontend/components/itemsMagazine/LinkModal";
import SuccessModalWithoutAnimation from "@/src/frontend/components/itemsMagazine/SuccessModalWithoutAnimation";
import {Places} from "@/src/lib/objects/Places";
import SubmitButton from "@/src/frontend/components/itemsMagazine/submitButton";





interface moveItemFormProps {
  id: number
}

const MoveItemForm: FC<moveItemFormProps> = ({id}) => {
  
  const [isClicked, setIsClicked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [object, setObject] = useState([]);
  const [placeId, setPlaceId] = useState(5)
  const {item, loading, error} = useItem(id)
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setIsClicked(true);
    setIsOpen(false);
    
    try {
      
      const payload = {
        placeId: placeId,
        shelfId: null,
        to: PlaceNameById(placeId),
        from: PlaceNameById(item?.placeId)
      }
      
      const result = await axios.put(`/api/item/move/${id}`, payload)
      
      setObject(result.data)
      setIsOpen(true)
      setIsClicked(false)
      
    } catch (e) {
      console.error(e)
    }
    
    
  };
  
  const handleChange = (e) => {
    setPlaceId(Number(e.target.value)); // Convert the string value to a number since IDs are typically numeric
  }
  
  return <div>
    
    <LinkModal>
      <>
        <SuccessModalWithoutAnimation
          isOpen={isOpen}
          text={'Przeniesiono przedmiot!'}
          objectData={object}
          bigText={'Przeniesiono!'}
        />
        <div className={'flex justify-center'}>
          <main className={'w-9/12 h-auto mb-28'}>
            
            <h1 className={'font-semibold text-3xl my-10 mx-auto '}>Przenoszenie przedmiotu nr {id}</h1>
            
            <form onSubmit={handleSubmit}>
              
              <div className="w-full flex justify-between">
                <div className="w-1/3">
                  <h2 className="text-lg mb-2">Miejsce docelowe przedmiotu</h2>
                  <p className="text-zinc-500 font-light text-sm">
                    Wybierz nowe miejsce, do którego ma trafić przedmiot
                  </p>
                </div>
                <div className="w-1/3 text-xs">
                  <div className="flex flex-col">
                    
                    <select
                      className="w-full border-gray-300 p-3 rounded-lg text-sm focus:border-gray-500 focus:shadow-lg transition duration-150 ease-in-out"
                      name="placeId"
                      onChange={handleChange}
                      value={placeId}
                    >
                      <option value="" disabled>Select a place ID</option>
                      {Places.map((place, index) => (
                        <option key={index} disabled={place.id === 18 || place.id === 1 || place.id === 2}
                                value={place.id}>
                          {place.name}
                        </option>
                      ))}
                    </select>
                    
                    <span className="pt-3 pl-1 mb-2 text-gray-500"></span>
                  </div>
                </div>
              </div>
              <SubmitButton className={'mt-10'} isClicked={isClicked}/>
            </form>
          </main>
        </div>
      </>
    </LinkModal>
  </div>
}

export default MoveItemForm