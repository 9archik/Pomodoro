import { useEffect } from 'react';
import { useState, useRef } from 'react';
import styles from './style.module.css';
const TasksBlock = () => {
	const [headerBtnsPopup, setHeaderBtnsPopup] = useState(false);

	let inputForm = useRef([]);

	inputForm.current = [];

	const [storage, setStorage] = useState(JSON.parse(localStorage.getItem('storage')));

	const [isAdd, setIsAdd] = useState(false);

	const [isHideTasks, setIsHideTasks] = useState(false);

	localStorage.setItem('storage', JSON.stringify(storage));

	const textareaHeight = (index) => {

		inputForm.current[index].style.height = '0px';
		const scrollHeight = inputForm.current[index].scrollHeight;
		inputForm.current[index].style.height = scrollHeight + 'px';
	};
	const [numChecked, setNumChecked] = useState();

	useEffect(() => {
		const funcNumChecked = () => {
			let num = 0;
			storage.forEach((el) => el.checked && num++);
			return num;
		};
		setNumChecked(() => (storage ? funcNumChecked() : 0));
	}, []);

	useEffect(() => {
		storage && (inputForm.current = inputForm.current.slice(0, storage.length));
		localStorage.setItem('storage', JSON.stringify(storage));
	}, [storage]);

	const addTask = (id) => {
		setIsAdd(!isAdd);
		let obj = {
			checked: false,
			info: '',
			isEdit: true,
			isNew: true,
			id: id,
			cache: '',
		};

		let copy = Object.assign([], storage);
		copy.push(obj);

		copy.map((element, index) => {
			if (index < copy.length - 1) {
				element.isEdit = false;
			} else {
				element.isEdit = true;
			}
		});

		setStorage(copy);
	};

	const onSaveClick = (id) => {
		let copy = Object.assign([], storage);
		copy[id].isEdit = false;
		copy[id].isNew = false;
		copy[id].cache = copy[id].info;

		setStorage(copy);
		setIsAdd(false);
	};

	const onCancelClick = (id) => {
		let copy = Object.assign([], storage);
		if (copy[id].isNew) {
			copy.pop();
		} else {
			copy[id].isEdit = false;
			copy[id].info = copy[id].cache;
		}

		setStorage(copy);
		setIsAdd(false);
	};

	const onChangeInput = (id, event) => {
		let copy = Object.assign([], storage);
		copy[id].info = event;
		textareaHeight(id);
		setStorage(copy);
	};

	const onClickEdit = (id) => {
		let copy = Object.assign([], storage);
		copy.map((elem) => (elem.id === id ? (elem.isEdit = true) : (elem.isEdit = false))),
			copy[copy.length - 1].isNew && copy.pop();
		setStorage(copy);
		setIsAdd(false);
	};

	const onClickDelete = (id) => {
		let copy = Object.assign([], storage);
		setNumChecked(copy[id].checked ? numChecked - 1 : numChecked);
		copy.splice(id, 1);

		setStorage(copy);
	};

	const addToRefs = (el) => {
		if (el && !inputForm.current.includes(el)) {
			inputForm.current.push(el);
		}
	};

	const onChangeCheckbox = (id) => {
		let copy = Object.assign([], storage);
		setNumChecked(copy[id].checked ? numChecked - 1 : numChecked + 1);
		copy[id].checked = !copy[id].checked;
		setStorage(copy);
	};

	return (
		<div className={styles.root}>
			<div className={styles.header}>
				<h3>
					Tasks
					<span className="timer-task__num-task"> {storage ? storage.length - numChecked : 0}</span>
				</h3>
				<div className={styles.headerButtons}>
					<button onClick={() => setHeaderBtnsPopup(!headerBtnsPopup)}>
						<svg
							aria-hidden="true"
							focusable="false"
							data-prefix="fas"
							data-icon="ellipsis-h"
							role="img"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 512 512"
							data-v-5733519c="">
							<path
								fill="currentColor"
								d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z"
								data-v-5733519c=""
								class=""></path>
						</svg>
					</button>
					<ul className={headerBtnsPopup ? styles.popup : styles.popupClose}>
						<li
							onClick={() => {
								setIsHideTasks(!isHideTasks);
								setHeaderBtnsPopup(!headerBtnsPopup);
							}}>
							{!isHideTasks ? (
								<svg
									data-v-60094630=""
									aria-hidden="true"
									focusable="false"
									data-prefix="fas"
									data-icon="eye-slash"
									role="img"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 640 512"
									className="svg-inline--fa fa-eye-slash fa-w-20">
									<path
										data-v-60094630=""
										fill="currentColor"
										d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"
										className=""></path>
								</svg>
							) : (
								<svg
									data-v-60094630=""
									aria-hidden="true"
									focusable="false"
									data-prefix="fas"
									data-icon="eye"
									role="img"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 576 512"
									class="svg-inline--fa fa-eye fa-w-18">
									<path
										data-v-60094630=""
										fill="currentColor"
										d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"
										class=""></path>
								</svg>
							)}
							{!isHideTasks ? 'Hide' : 'Show'} completed tasks
						</li>
						<li
							onClick={() => {
								setStorage(() => storage.filter((element) => element.checked));
								setHeaderBtnsPopup(!headerBtnsPopup);
							}}>
							<svg
								data-v-60094630=""
								aria-hidden="true"
								focusable="false"
								data-prefix="fas"
								data-icon="trash"
								role="img"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 448 512"
								className="svg-inline--fa fa-trash fa-w-14">
								<path
									data-v-60094630=""
									fill="currentColor"
									d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"
									className=""></path>
							</svg>
							Remove to do list
						</li>
						<li
							onClick={() => {
								setStorage(() => storage.filter((element) => !element.checked));
								setHeaderBtnsPopup(!headerBtnsPopup);
								setNumChecked(0);
							}}>
							<svg
								data-v-60094630=""
								aria-hidden="true"
								focusable="false"
								data-prefix="fas"
								data-icon="trash"
								role="img"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 448 512"
								className="svg-inline--fa fa-trash fa-w-14">
								<path
									data-v-60094630=""
									fill="currentColor"
									d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"
									className=""></path>
							</svg>
							Remove done list
						</li>
					</ul>
				</div>
			</div>

			<ul className={styles.taskList}>
				{storage &&
					storage.map((element, index) => {
						if (!(isHideTasks && element.checked))
							return (
								<li key={index}>
									{!element.isEdit && (
										<>
											<div className={element.checked ? styles.taskItemChecked : styles.taskItem}>
												<input
													checked={element.checked ? 'yes' : ''}
													onChange={() => onChangeCheckbox(index)}
													type="checkbox"
													id={index}
												/>
												<label className={element.checked && styles.labelChecked} for={index}>
													{element.info}
												</label>

												<div className={styles.taskItemBtns}>
													<button onClick={() => onClickDelete(index)} className={styles.delete}>
														<svg
															data-v-e06fc954=""
															aria-hidden="true"
															focusable="false"
															data-prefix="fas"
															data-icon="trash"
															role="img"
															xmlns="http://www.w3.org/2000/svg"
															viewBox="0 0 448 512"
															class="text-lg mr-3 pointer-events-none svg-inline--fa fa-trash fa-w-14">
															<path
																data-v-e06fc954=""
																fill="currentColor"
																d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"
																class=""></path>
														</svg>
													</button>
													<button onClick={() => onClickEdit(index)} className={styles.edit}>
														<svg
															data-v-e06fc954=""
															aria-hidden="true"
															focusable="false"
															data-prefix="fas"
															data-icon="pen"
															role="img"
															xmlns="http://www.w3.org/2000/svg"
															viewBox="0 0 512 512"
															class="text-lg mr-3 pointer-events-none svg-inline--fa fa-pen fa-w-16">
															<path
																data-v-e06fc954=""
																fill="currentColor"
																d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z"
																class=""></path>
														</svg>
													</button>
												</div>
											</div>
										</>
									)}
									<div className={element.isEdit ? styles.taskItemInput : styles.isEdit}>
										<textarea
											style={{ overflow: 'hidden' }}
											className={styles.inputForm}
											ref={addToRefs}
											type="text"
											value={element.info}
											onChange={(event) => onChangeInput(index, event.target.value)}
										/>
										<div>
											<button onClick={() => element.info && onSaveClick(index)}>Save</button>
											<button className={styles.cancelBtn} onClick={() => onCancelClick(index)}>
												Cancel
											</button>
										</div>
									</div>
								</li>
							);
						else return <></>;
					})}
			</ul>

			{!isAdd && (
				<button
					onClick={() => addTask(storage === null ? 0 : storage.length)}
					className={!isAdd ? styles.addTask : styles.isAdd}>
					<i className="fa fa-plus" aria-hidden="true"></i> Add another task
				</button>
			)}
		</div>
	);
};

export default TasksBlock;
