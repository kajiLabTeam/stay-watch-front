import { useEffect } from 'react';
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import { useEditingMapState } from '@/features/admin/editFloorMap/hooks/editingMapState';
import { useSuspenseSWR } from '@/hooks/useSuspenseSWR';
import { EditorRoom, Building } from '@/types/roomFloormap';
import { endpoints } from '@/utils/api';

export const useEditingPolygonCanvas = () => {
    
}
const mouseMove = () => {

}