'use client';

import { InventoryProductTable } from '@/components/features/inventory/product-table';
import { InventoryInput } from '../features/inventory/inventory-input';
import { TProduct } from '@/db/db.types';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useRouter, useSearchParams } from 'next/navigation';
import { TSortOrder } from '@/app/(02_inventory)/inventory/page';

interface IInventoryWidgetProps {
  initialProducts: TProduct[];
  totalPages: number;
  currentPage: number;
  sortField?: string;
  sortOrder?: TSortOrder;
}

export function InventoryWidget({
  initialProducts,
  totalPages,
  currentPage,
  sortField,
  sortOrder,
}: IInventoryWidgetProps) {
  // useRouter(): Gives us access to the navigation object.
  // We use the .push() method to tell the browser, "Go to this address,
  // saving your navigation history (so the back button works)."
  const router = useRouter();
  // useSearchParams() - "hook reader." It allows you to read current URL parameters.
  const searchParams = useSearchParams();

  const currentSearch = searchParams.get('q') || '';

  // handleSearch - to synch input typed text by user with search of this query in db
  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set('q', value);
    } else {
      params.delete('q');
    }
    params.set('page', '1');
    router.push(`/inventory?${params.toString()}`);
  };

  // handlePageChange - func for pages changing
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`/inventory?${params.toString()}`);
  };

  const getPaginationRange = (current: number, total: number) => {
    const delta = 2; // how many pages to show around the current one
    const range: (number | string)[] = [];

    // the 1st page is ALWAYS here
    range.push(1);

    // logic of the left ...
    if (current - delta > 2) {
      range.push('...');
    }

    // the range around the current page
    for (
      let i = Math.max(2, current - delta);
      i <= Math.min(total - 1, current + delta);
      i++
    ) {
      range.push(i);
    }

    // logic of the rigth ...
    if (current + delta < total - 1) {
      range.push('...');
    }

    // the last page is ALWAYS here if total > 1
    if (total > 1) {
      range.push(total);
    }

    return range;
  };

  // handleSort - function that switch the sort (field) and order (asc/desc) parameters in the URL.
  const handleSort = (column: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentSort = params.get('sort');
    const currentOrder = params.get('order');

    const newOrder =
      currentSort === column && currentOrder === 'asc' ? 'desc' : 'asc';

    params.set('sort', column);
    params.set('order', newOrder);
    params.set('page', '1');

    router.push(`/inventory?${params.toString()}`);
  };

  return (
    <div className="space-y-4">
      <InventoryInput value={currentSearch} onChange={handleSearch} />

      <InventoryProductTable
        products={initialProducts}
        onSort={handleSort}
        sortField={sortField}
        sortOrder={sortOrder}
      />

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            {/* button "Previous" */}
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                className={`cursor-pointer hover:text-brand-primary  ${currentPage <= 1 ? 'pointer-events-none opacity-50' : ''}`}
              />
            </PaginationItem>

            {/* list of pages */}
            {getPaginationRange(currentPage, totalPages).map((page, index) => (
              <PaginationItem key={index}>
                {page === '...' ? (
                  // if ... do NOTHING
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    onClick={() => handlePageChange(Number(page))}
                    isActive={page === currentPage}
                    className={`cursor-pointer transition-colors ${
                      page === currentPage
                        ? 'bg-brand-light border border-brand-primary'
                        : 'hover:text-brand-primary hover:bg-brand-border'
                    }`}
                  >
                    {page}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            {/* button "Next" */}
            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  handlePageChange(Math.min(totalPages, currentPage + 1))
                }
                className={`cursor-pointer hover:text-brand-primary hover:bg-brand-border ${currentPage >= totalPages ? 'pointer-events-none opacity-50' : ''}`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
