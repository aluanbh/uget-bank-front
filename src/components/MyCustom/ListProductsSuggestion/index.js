import React, { memo } from 'react';
import Money from '../../../helpers/utils/money/money';
import Checks, { ChecksGroup } from '../../bootstrap/forms/Checks';
import FormGroup from '../../bootstrap/forms/FormGroup';
import Input from '../../bootstrap/forms/Input';

function ProductSuggestionItem({product, onChange, checked}) {
  return(
    <div className='row g-4 py-2'>
      <div className='col-md-1'>
        <div className='h-100 d-flex align-items-center justify-content-center'>
          <ChecksGroup>
            <Checks
              type='switch'
              id='products_suggestion'
              name='products_suggestion'
              value={product.id}
              onChange={onChange}
              checked={checked}
              isInline
            />
          </ChecksGroup>
        </div>
      </div>
      <div className='col-md-1'>
        <img
          src={product.image_url}
          alt='Img'
          width={40}
          height={40}
        />
      </div>
      <div className='col-md-7'>
        <FormGroup>
          <Input value={product.name} disabled readOnly />
        </FormGroup>
      </div>
      <div className='col-md-2'>
        <FormGroup>
          <Input
            value={Money.centsToMaskMoney(product.price)}
            disabled
            readOnly
          />
        </FormGroup>
      </div>
    </div>
  );
}

const ProductSuggestionElement = memo(ProductSuggestionItem);

function ListProductSuggestions({ products, productsSelected, onChange }) {
  
  if(!productsSelected) return null;
	return (
		<div style={{ maxHeight: 300 }} className='overflow-y'>
			{products.map((product, index) => {
				return (
					<ProductSuggestionElement
            key={'ch_comp'+index}
            product={product}
            onChange={onChange}
            checked={productsSelected.includes(product.id)}
          />
				);
			})}
		</div>
	);
}

export default memo(ListProductSuggestions);
