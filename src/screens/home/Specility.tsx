import React, { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { CategoryItem, HorizontalLoader } from '@/components';
import { useAppStore } from '@/hooks';
import { NavigationService } from '@/services';
import { ROUTES } from '@/stack';
import { Category, CategoryProps } from '@/types/category';
import { useStyleHome } from './styles';

const Specility = () => {
  const styles = useStyleHome();
  const { clinic, appState } = useAppStore();
  const [loading, setLoading] = useState(false);

  const keyExtractor = useCallback(({ id }) => id.toString(), []);

  const onCategoryPress = useCallback(
    async (item: Category) => {
      console.log('item = ', item);
      try {
        appState.isShowLoading = true;
        const doctors = await clinic.getSpecialties(+item.id, false);
        NavigationService.navigate(ROUTES.SEARCH, { doctors });
      } catch (error) {
      } finally {
        appState.isShowLoading = false;
      }
    },
    [appState, clinic],
  );

  const getSpecialties = useCallback(async () => {
    try {
      setLoading(true);
      await clinic.getSpecialties();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, [clinic]);

  useEffect(() => {
    getSpecialties();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const categoryItem = useCallback(
    ({ item }: CategoryProps) => {
      return <CategoryItem onPress={onCategoryPress} item={item} />;
    },
    [onCategoryPress],
  );

  if (loading) {
    return <HorizontalLoader />;
  }

  return (
    <>
      <FlatList
        style={styles.categoryList}
        // @ts-ignore
        data={clinic.specialties}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={categoryItem}
        {...{ keyExtractor }}
      />
    </>
  );
};

export default Specility;
