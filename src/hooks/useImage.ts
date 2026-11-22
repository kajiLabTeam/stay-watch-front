import { useQuery } from '@tanstack/react-query';

const loadImage = (path: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    // キャッシュヒット時のレースを避けるため、onload を src より先に設定する
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Failed to load image: ${path}`));
    image.src = path;
  });
};

/** 画像を事前ロードする。読み込み完了後に HTMLImageElement を返す */
export const useImage = (path: string) => {
  const { data: image, isError } = useQuery({
    queryKey: ['image', path],
    queryFn: () => loadImage(path),
    retry: false,
    staleTime: Infinity,
  });

  return { image, isError };
};
