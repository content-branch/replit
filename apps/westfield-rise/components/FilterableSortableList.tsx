import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Entry } from 'contentful';
import styles from './FilterableSortableList.module.scss';
import { getMappedCategories, getMappedItem } from '../mapping/mappingHelpers';
import {
  Button,
  Loader,
  Sidebar,
} from '@westfield-rise/westfield-rise-react-components';

import {
  ListCard,
  Filters,
} from '@westfield-rise/westfield-rise-react-components';
import { api } from '../utils/api';
import { useRouter } from 'next/router';

type FilterableSortableListProps = {
  entry: Entry<any>;
  theme: string | undefined;
  locale: string;
  prefix: string;
};

type Filters = {
  field: string;
  value: string;
}[];

export type RotationStates = {
  [key: string]: {
    checkboxId: string;
    direction: 'asc' | 'desc';
  };
};

export function FilterableSortableList({
  entry,
  theme,
  locale,
  prefix,
}: FilterableSortableListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 3;
  const [itemsToDisplay, setItemsToDisplay] = useState<any[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [activeFilters, setActiveFilters] = useState<Filters>([]);
  const [activeSorter, setActiveSorter] = useState<string>('fields.title');
  const [sortDirection, setSortDirection] = useState<string>('asc');
  const [rotationStates, setRotationStates] = useState<RotationStates>({});
  const [selectedCheckbox, setSelectedCheckbox] = useState<string>('');
  const [selectedLocale, setSelectedLocale] = useState<string>('');

  const { data: result, isLoading } = api.pages.component.useQuery({
    entryId: entry.sys.id,
    locale,
  });

  const router = useRouter()

  const contentTypeToFilter =
    result?.items[0].fields.listItemType.sys.contentType.sys.id;

  const filterCategories = api.pages.getFilters.useQuery(
    {
      contentType: 'filterCategory',
      locale,
      limit: 1000,
      skip: 0,
      orderField: '',
      sortDirection: '',
      include: itemsPerPage,
      filters: [
        { field: 'contentType', value: contentTypeToFilter },
        { field: 'parentCategory', value: null, exists: true },
      ],
    },
    { enabled: !isLoading && contentTypeToFilter !== undefined },
  );

  const resultsOrder = result?.items[0].fields.order?.map(function (
    item: Entry<any>,
  ) {
    return item.sys.id;
  });

  const {
    data: listItems,
    isLoading: cardsLoading,
    refetch,
  } = api.pages.getPaginatedFilteredList.useQuery(
    {
      contentType: contentTypeToFilter,
      locale,
      limit: itemsPerPage,
      skip: (currentPage - 1) * itemsPerPage,
      orderField: activeSorter,
      sortDirection: sortDirection,
      include: itemsPerPage,
      filters: activeFilters,
      order: resultsOrder,
    },
    {
      enabled: !isLoading && contentTypeToFilter !== undefined,
    },
  );

  const getFilterUrl = (activeFilters: Filters) => {
    const filters = mappedFilterCategories.reduce((result: any, item: any) => {
      const selectedSubCategories = activeFilters
        .filter(filter => filter.field === 'category.sys.id')
        .map(filter => filter.value.split(','))
        .flat();
      const selectedSubCategoriesIds = selectedSubCategories.map(
        selectedSubCategory => item.options.find((option: {id: string, value: string, label: string}) => option.id === selectedSubCategory),
      );
      if (selectedSubCategoriesIds.length > 0) {
        result[item.title] = selectedSubCategoriesIds.map(
          selectedSubCategory => selectedSubCategory?.label,
        ).filter(Boolean);
      }
      return result;
    }, {});
    let filterUrl= ''
    if (filters) {
      const filterArray: string[] = []
      Object.keys(filters).forEach(filter => {
          if(filters[filter].length){
            filterArray.push(`&${filter}[]=${(filters[filter].map((item : string) => encodeURI(item)).join(`&${filter}[]=`))}`)
          }
        })
        filterUrl = filterArray.join('');
    }    
    return(getSortUrl() + filterUrl);
  }

  const getSortUrl = () => {
    const sort = activeSorter.split('.')[1]
    const sortUrl = `sort=${sort}&direction=${sortDirection}`
    return sortUrl
  }
  
  useEffect(() => {
    setSelectedLocale(locale);
    if (selectedLocale !== '' && selectedLocale !== locale) {
      setItemsToDisplay([]);
      setCurrentPage(1);
      refetch();
    }
  }, [locale, refetch, selectedLocale]);

  const entryIds = listItems?.results.items.map(item => item.sys.id);

  const { data: pages, isLoading: isPageLoading } =
    api.pages.getLinkedEntities.useQuery(
      {
        contentType: 'page',
        entryIds: entryIds || [],
      },
      { enabled: !!entryIds && contentTypeToFilter === 'caseStudy' },
    );

  useMemo(() => {
    if (!title) {
      if (entry && entry.fields.title) {
        setTitle(entry.fields.title);
      } else {
        setTitle('Title not found for the selected language');
      }
    }

    if (listItems) {
      setTotalItems(listItems.totalResults);
    }

    if (
      listItems?.results.items &&
      ((contentTypeToFilter === 'caseStudy' && pages) ||
        contentTypeToFilter !== 'caseStudy')
    ) {
      const mappedItems = listItems?.results.items
        .map(item => getMappedItem({ item, contentTypeToFilter, pages }))
        .filter(Boolean);

      // if (itemsToDisplay.length <= listItems.total) {

      // }
      
      setItemsToDisplay(prevItems => [...prevItems, ...mappedItems]);
    }
  }, [listItems, pages]);

  const mappedFilterCategories = useMemo(() => {  
    if (filterCategories?.data?.items) {
      return getMappedCategories(filterCategories.data?.items);
    }
    return [];
  }, [filterCategories.data?.items]);

  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, itemsToDisplay.length);
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.25,
    };

    const callback = (entries: IntersectionObserverEntry[]) => {
      const middleIndex = Math.floor(entries.length / 2);

      entries.forEach((entry, index) => {
        const delay = Math.abs(index - middleIndex) * 100;

        setTimeout(() => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles['visible']);
          }
        }, delay);
      });
    };

    const observer = new IntersectionObserver(callback, options);

    cardRefs.current.forEach(cardRef => {
      if (cardRef) {
        observer.observe(cardRef);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [itemsToDisplay]);

  const cardList = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      
      entries => {
        if (
          entries[0].isIntersecting &&
          !cardsLoading &&
          totalItems > 0 &&
          totalItems / itemsPerPage > currentPage 
        ) {
          setCurrentPage(prev => prev + 1);
          refetch();
        }
      },
      { threshold: 0, root: null, rootMargin: '0px' },
    );

    const targetElement = cardList.current;
    if (targetElement) {
      observer.observe(targetElement);
    }

    return () => {
      observer.disconnect();
    };
  }, [itemsToDisplay, isPageLoading]);
    
  const onSubmitFilters = (data: any) => {      
    setItemsToDisplay([]);
    setCurrentPage(1);
    if (typeof data?.filters?.[0] === 'object' && data?.filters?.[0] !== null) {
      const appliedFilters: any = [];      
      data.filters.forEach((filter: any) => {
        if (filter.all === true) return;

        const selectedSubCategories = Object.keys(filter)
          .filter(subKey => filter[subKey] === true && subKey !== 'all')
          .map(subKey => ({
            field: 'category.sys.id',
            value: subKey,
          }));

        if (selectedSubCategories.length > 1) {
          appliedFilters.push({
            isUnion: true,
            field: 'category.sys.id',
            value: selectedSubCategories
              .map((item: any) => item.value)
              .join(','),
          });
        } else {
          if (selectedSubCategories.length > 0)
            appliedFilters.push({
              isUnion: false,
              field: 'category.sys.id',
              value: selectedSubCategories[0].value,
            });
        }
      });

      const sortingObject = [
        {
          title: selectedCheckbox === 'title',
        },
        {
          date: selectedCheckbox === 'date',
        },
      ];

      const appliedSorter = sortingObject.reduce((result: any, item: any) => {
        const key = Object.keys(item)[0];
        const value = Object.values(item)[0];

        if (!result && value === true) {
          return key;
        }
        return result;
      }, null);

      const rotationDirection = Object.values(rotationStates)
        .map(obj => obj.direction)
        .find(direction => direction !== undefined);

      if (rotationDirection) {
        setSortDirection(rotationDirection);
      }

      if (appliedSorter === 'title') {
        setActiveSorter('fields.title');
      }
      if (appliedSorter === 'date') {
        setActiveSorter('sys.updatedAt');
      }

      setActiveFilters(appliedFilters);
      const pathName = Array.isArray(router.query.slug) ? router.query.slug.join('/') : ''    
      const filterUrl = getFilterUrl(appliedFilters)
      router.push( `${pathName}?${filterUrl}`, `${pathName}?${filterUrl}`, { shallow: true })

    }
    setSidebarOpen(false);
  };

  useMemo(() => {
    if(filterCategories.data) {
      const query = router.asPath.split('?')[1]
      if(!query) return
      const url = query.split(/(?<!%20)&(?!%20)/)

      const parsedFilter: any[] = []
      url.forEach((item: string) => {
        const [field, value] = item.split(/\[\]=|=/)
        if (field === 'sort') {
          setActiveSorter(value === 'title' ? `fields.${value}` : `sys.updatedAt`)
        } else if (field === 'direction') {
          setSortDirection(value)
        } else if(parsedFilter.find((item: any) => item.field === field)){
          const index = parsedFilter.findIndex((item: any) => item.field === field)
          parsedFilter[index].value = parsedFilter[index].value.concat(decodeURI(value))
        } else {
          parsedFilter.push({field, value: [decodeURI(value)]})
        }
      })

      const appliedFilters: any[] = [];
      const mappedFilterCategories = filterCategories.data?.items ? getMappedCategories(filterCategories.data?.items) : [];
      parsedFilter.forEach((filter)=> {
        const fil = mappedFilterCategories.find((subCategory) => subCategory.title === filter.field)
        appliedFilters.push({
          field: 'category.sys.id',
          isUnion: filter.value.length > 1 ? true : false,
          value: filter.value.map((item: string) => fil?.options.find(option => option.label === item)?.id).join(',')
        })
      })
      setActiveFilters(appliedFilters)
    }
  },[filterCategories.data])

  if (isLoading) return <Loader />;

  return (
    <>
      <div className={styles['container']}>
        <div className={styles['container__header']}>
          <div className={styles['container__header__total_number']}>
            {totalItems} {title}
          </div>
          <Button
            variant="filter"
            label="Filter/Sort"
            onClick={() => setSidebarOpen(true)}
          />
        </div>
        <div className={styles['container__inner']}>
          {itemsToDisplay?.map((item, index) => (
            <div
              className={`${styles['card']} card`}
              key={index}
              ref={ref => (cardRefs.current[index] = ref)}
            >
              <ListCard
                type={item.type}
                title={item.title}
                image={item.image}
                text={item.text}
                brandName={item.brandName}
                ctaProps={item.ctaProps}
                slug={item.slug}
                prefix={prefix}
                value={item.valueToDisplay}
              />
            </div>
          ))}
        </div>
        <div ref={cardList} style={{ height: 1 }}></div>
      </div>
      <Sidebar
        position="left"
        setIsOpen={setSidebarOpen}
        isOpen={sidebarOpen}
        withOverlay={true}
      >
        <Filters
          title={'Filter'}
          sorting={{
            title: 'Sort by',
            fields: [
              {
                id: 'title',
                value: 'titleAz',
                label:
                  contentTypeToFilter === 'caseStudy'
                    ? 'Brand (A-z)'
                    : 'Title (A-z)',
              },
              {
                id: 'date',
                value: 'date',
                label: 'Date',
              },
            ],
          }}
          filterGroups={mappedFilterCategories}
          onSubmit={data => {
            onSubmitFilters(data);
          }}
          rotationStates={rotationStates}
          setRotationStates={setRotationStates}
          selectedCheckbox={selectedCheckbox}
          setSelectedCheckbox={setSelectedCheckbox}
        />
      </Sidebar>
    </>
  );
}

export default FilterableSortableList;
